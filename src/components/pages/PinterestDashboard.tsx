import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pinterestApi, type Board, type Pin, type PinAnalytics } from '../../services/pinterestApi';

export default function PinterestDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [boards, setBoards] = useState<Board[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  const [pins, setPins] = useState<Pin[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    loadDashboardData();
  }, []);

  useEffect(() => {
    if (selectedBoard) {
      loadBoardPins(selectedBoard);
    }
  }, [selectedBoard]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const accessToken = localStorage.getItem('pinterest_access_token');
      if (!accessToken) {
        navigate('/auth');
        return;
      }

      // Load boards
      const boardsData = await pinterestApi.getBoards(accessToken);
      setBoards(boardsData.items || []);

      // Load user analytics
      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      try {
        const analyticsData = await pinterestApi.getUserAnalytics(
          accessToken,
          startDate,
          endDate
        );
        setAnalytics(analyticsData);
      } catch (err) {
        console.warn('Analytics not available:', err);
      }

      setLoading(false);
    } catch (err) {
      console.error('Failed to load dashboard:', err);
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
      setLoading(false);
    }
  };

  const loadBoardPins = async (boardId: string) => {
    try {
      const accessToken = localStorage.getItem('pinterest_access_token');
      if (!accessToken) return;

      const pinsData = await pinterestApi.getBoardPins(accessToken, boardId);
      setPins(pinsData.items || []);
    } catch (err) {
      console.error('Failed to load pins:', err);
    }
  };

  const getDaysAgo = () => {
    switch (dateRange) {
      case '7d': return 7;
      case '30d': return 30;
      case '90d': return 90;
      default: return 30;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-red-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Pinterest Analytics Dashboard
              </h1>
              <p className="text-gray-600">
                Monitor your pin performance and engagement metrics
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => navigate('/credentials')}
                className="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                View Credentials
              </button>
              <button
                onClick={loadDashboardData}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Date Range Selector */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Time Period</h3>
            <div className="flex space-x-2">
              {(['7d', '30d', '90d'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    dateRange === range
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {range === '7d' ? 'Last 7 Days' : range === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Analytics Overview */}
        {analytics && (
          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Total Impressions</h3>
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {analytics.all?.[0]?.impression?.toLocaleString() || '0'}
              </p>
              <p className="text-sm text-gray-500 mt-1">Views on your pins</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Total Saves</h3>
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {analytics.all?.[0]?.save?.toLocaleString() || '0'}
              </p>
              <p className="text-sm text-gray-500 mt-1">Pins saved by users</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Pin Clicks</h3>
                <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {analytics.all?.[0]?.pin_click?.toLocaleString() || '0'}
              </p>
              <p className="text-sm text-gray-500 mt-1">Clicks on your pins</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Outbound Clicks</h3>
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {analytics.all?.[0]?.outbound_click?.toLocaleString() || '0'}
              </p>
              <p className="text-sm text-gray-500 mt-1">Clicks to your website</p>
            </div>
          </div>
        )}

        {/* Boards Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Boards</h2>
          
          {boards.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No boards found. Create boards on Pinterest to see them here.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {boards.map((board) => (
                <button
                  key={board.id}
                  onClick={() => setSelectedBoard(board.id)}
                  className={`text-left p-4 rounded-lg border-2 transition-all ${
                    selectedBoard === board.id
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <h3 className="font-semibold text-gray-900 mb-1">{board.name}</h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {board.description || 'No description'}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{board.pin_count || 0} pins</span>
                    <span className="text-gray-400 capitalize">{board.privacy}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Pins Section */}
        {selectedBoard && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Pins from {boards.find(b => b.id === selectedBoard)?.name}
            </h2>
            
            {pins.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No pins found in this board.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {pins.map((pin) => (
                  <div key={pin.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    {pin.media?.images?.['400x300'] && (
                      <img
                        src={pin.media.images['400x300'].url}
                        alt={pin.title || 'Pin'}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-3">
                      <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                        {pin.title || 'Untitled Pin'}
                      </h3>
                      {pin.description && (
                        <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                          {pin.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{new Date(pin.created_at).toLocaleDateString()}</span>
                        {pin.link && (
                          <a
                            href={pin.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-600 hover:underline"
                          >
                            View
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4">
          <h3 className="font-semibold text-blue-900 mb-2">📊 Analytics Information</h3>
          <ul className="space-y-1 text-blue-800 text-sm">
            <li>• Analytics data may take 24-48 hours to appear after pin creation</li>
            <li>• Metrics are updated daily by Pinterest</li>
            <li>• Historical data availability depends on your Pinterest account age</li>
            <li>• Some metrics may require a Pinterest Business account</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
