import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { schedulerService, type ScheduledPin } from '../../services/schedulerService';
import { pinterestApi, type Board } from '../../services/pinterestApi';

export default function ScheduledPins() {
  const navigate = useNavigate();
  const [pins, setPins] = useState<ScheduledPin[]>([]);
  const [boards, setBoards] = useState<Board[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'published' | 'failed'>('all');
  const [stats, setStats] = useState({ total: 0, pending: 0, published: 0, failed: 0 });
  const [selectedPin, setSelectedPin] = useState<ScheduledPin | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, [filter]);

  const loadData = async () => {
    // Load pins based on filter
    let filteredPins: ScheduledPin[];
    switch (filter) {
      case 'pending':
        filteredPins = schedulerService.getPendingPins();
        break;
      case 'published':
        filteredPins = schedulerService.getPublishedPins();
        break;
      case 'failed':
        filteredPins = schedulerService.getFailedPins();
        break;
      default:
        filteredPins = schedulerService.getScheduledPins();
    }

    // Sort by scheduled time (newest first for published, oldest first for pending)
    filteredPins.sort((a, b) => {
      if (filter === 'published') {
        return new Date(b.scheduled_time).getTime() - new Date(a.scheduled_time).getTime();
      }
      return new Date(a.scheduled_time).getTime() - new Date(b.scheduled_time).getTime();
    });

    setPins(filteredPins);
    setStats(schedulerService.getStats());

    // Load boards if not already loaded
    if (boards.length === 0) {
      try {
        const accessToken = localStorage.getItem('pinterest_access_token');
        if (accessToken) {
          const boardsData = await pinterestApi.getBoards(accessToken);
          setBoards(boardsData.items || []);
        }
      } catch (err) {
        console.error('Failed to load boards:', err);
      }
    }
  };

  const getBoardName = (boardId: string): string => {
    const board = boards.find(b => b.id === boardId);
    return board ? board.name : boardId;
  };

  const handleDelete = (pinId: string) => {
    schedulerService.deleteScheduledPin(pinId);
    setShowDeleteConfirm(null);
    loadData();
  };

  const handleRetry = (pinId: string) => {
    schedulerService.retryPin(pinId);
    loadData();
  };

  const handleEdit = (pin: ScheduledPin) => {
    setSelectedPin(pin);
  };

  const handleUpdate = (pinId: string, updates: Partial<ScheduledPin>) => {
    schedulerService.updateScheduledPin(pinId, updates);
    setSelectedPin(null);
    loadData();
  };

  const formatDateTime = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getStatusBadge = (status: ScheduledPin['status']) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      publishing: 'bg-blue-100 text-blue-800',
      published: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
    };
    return badges[status];
  };

  const getStatusIcon = (status: ScheduledPin['status']) => {
    switch (status) {
      case 'pending':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'publishing':
        return (
          <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      case 'published':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'failed':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Scheduled Pins</h1>
              <p className="text-gray-600">Manage your scheduled and published pins</p>
            </div>
            <button
              onClick={() => navigate('/schedule')}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Schedule New Pin</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Pins</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <svg className="w-10 h-10 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Published</p>
                <p className="text-3xl font-bold text-green-600">{stats.published}</p>
              </div>
              <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Failed</p>
                <p className="text-3xl font-bold text-red-600">{stats.failed}</p>
              </div>
              <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b border-gray-200">
            {(['all', 'pending', 'published', 'failed'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  filter === tab
                    ? 'border-b-2 border-red-600 text-red-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Pins List */}
        {pins.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No pins found</h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all' 
                ? "You haven't scheduled any pins yet."
                : `No ${filter} pins at the moment.`}
            </p>
            <button
              onClick={() => navigate('/schedule')}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Schedule Your First Pin
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {pins.map((pin) => (
              <div key={pin.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Image Preview */}
                    {(pin.image_url || pin.image_base64) && (
                      <div className="flex-shrink-0">
                        <img
                          src={pin.image_url || pin.image_base64}
                          alt={pin.title}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      </div>
                    )}

                    {/* Pin Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{pin.title}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2">{pin.description}</p>
                        </div>
                        <span className={`ml-4 px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusBadge(pin.status)}`}>
                          {getStatusIcon(pin.status)}
                          <span>{pin.status}</span>
                        </span>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          {getBoardName(pin.board_id)}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {formatDateTime(pin.scheduled_time)}
                        </span>
                        {pin.link && (
                          <a
                            href={pin.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-red-600 hover:underline"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Link
                          </a>
                        )}
                      </div>

                      {/* Error Message */}
                      {pin.status === 'failed' && pin.error_message && (
                        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                          <strong>Error:</strong> {pin.error_message}
                        </div>
                      )}

                      {/* Published Info */}
                      {pin.status === 'published' && pin.published_at && (
                        <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded text-sm text-green-700">
                          Published on {formatDateTime(pin.published_at)}
                          {pin.pinterest_pin_id && (
                            <a
                              href={`https://www.pinterest.com/pin/${pin.pinterest_pin_id}/`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-2 underline"
                            >
                              View on Pinterest
                            </a>
                          )}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex space-x-2">
                        {pin.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleEdit(pin)}
                              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => setShowDeleteConfirm(pin.id)}
                              className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                            >
                              Delete
                            </button>
                          </>
                        )}
                        {pin.status === 'failed' && (
                          <button
                            onClick={() => handleRetry(pin.id)}
                            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                          >
                            Retry
                          </button>
                        )}
                        {pin.status === 'published' && (
                          <button
                            onClick={() => setShowDeleteConfirm(pin.id)}
                            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                          >
                            Remove from List
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delete Confirmation */}
                {showDeleteConfirm === pin.id && (
                  <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                    <p className="text-sm text-gray-700 mb-3">
                      Are you sure you want to delete this scheduled pin?
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDelete(pin.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                      >
                        Yes, Delete
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(null)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {selectedPin && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6">
              <h2 className="text-2xl font-bold mb-4">Edit Scheduled Pin</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    defaultValue={selectedPin.title}
                    onChange={(e) => setSelectedPin({ ...selectedPin, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    defaultValue={selectedPin.description}
                    onChange={(e) => setSelectedPin({ ...selectedPin, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled Time</label>
                  <input
                    type="datetime-local"
                    defaultValue={new Date(selectedPin.scheduled_time).toISOString().slice(0, 16)}
                    onChange={(e) => setSelectedPin({ ...selectedPin, scheduled_time: new Date(e.target.value).toISOString() })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      handleUpdate(selectedPin.id, {
                        title: selectedPin.title,
                        description: selectedPin.description,
                        scheduled_time: selectedPin.scheduled_time,
                      });
                    }}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setSelectedPin(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Made with Bob
