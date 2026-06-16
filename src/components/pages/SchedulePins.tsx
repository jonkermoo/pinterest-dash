import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pinterestApi, type Board } from '../../services/pinterestApi';
import { schedulerService } from '../../services/schedulerService';

export default function SchedulePins() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [boards, setBoards] = useState<Board[]>([]);
  const [formData, setFormData] = useState({
    board_id: '',
    title: '',
    description: '',
    link: '',
    image_url: '',
    scheduled_date: '',
    scheduled_time: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBoards();
  }, []);

  const loadBoards = async () => {
    try {
      const accessToken = localStorage.getItem('pinterest_access_token');
      if (!accessToken) {
        navigate('/auth');
        return;
      }

      const boardsData = await pinterestApi.getBoards(accessToken);
      setBoards(boardsData.items || []);
    } catch (err) {
      console.error('Failed to load boards:', err);
      setError('Failed to load boards. Please try again.');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    // Validate file size (max 32MB for Pinterest)
    if (file.size > 32 * 1024 * 1024) {
      setError('Image size must be less than 32MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setImagePreview(base64);
      setFormData(prev => ({ ...prev, image_url: base64 }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validate form
    if (!formData.board_id) {
      setError('Please select a board');
      return;
    }
    if (!formData.title) {
      setError('Please enter a title');
      return;
    }
    if (!formData.image_url) {
      setError('Please upload an image or provide an image URL');
      return;
    }
    if (!formData.scheduled_date || !formData.scheduled_time) {
      setError('Please select a date and time');
      return;
    }

    // Combine date and time
    const scheduledDateTime = new Date(`${formData.scheduled_date}T${formData.scheduled_time}`);
    
    // Validate scheduled time is in the future
    if (scheduledDateTime <= new Date()) {
      setError('Scheduled time must be in the future');
      return;
    }

    setLoading(true);

    try {
      // Determine if image is URL or base64
      const isBase64 = formData.image_url.startsWith('data:');

      schedulerService.addScheduledPin({
        board_id: formData.board_id,
        title: formData.title,
        description: formData.description,
        link: formData.link || undefined,
        image_url: isBase64 ? undefined : formData.image_url,
        image_base64: isBase64 ? formData.image_url : undefined,
        scheduled_time: scheduledDateTime.toISOString(),
      });

      setSuccess('Pin scheduled successfully!');
      
      // Reset form
      setFormData({
        board_id: '',
        title: '',
        description: '',
        link: '',
        image_url: '',
        scheduled_date: '',
        scheduled_time: '',
      });
      setImagePreview(null);

      // Redirect to scheduled pins after 2 seconds
      setTimeout(() => {
        navigate('/scheduled');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to schedule pin');
    } finally {
      setLoading(false);
    }
  };

  const handleScheduleNow = async () => {
    // Set scheduled time to now
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().slice(0, 5);
    
    setFormData(prev => ({
      ...prev,
      scheduled_date: date,
      scheduled_time: time,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Schedule a Pin</h1>
          <p className="text-gray-600">
            Create and schedule pins to be published automatically to Pinterest
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4">
            <p className="text-green-700">{success}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          {/* Board Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Board *
            </label>
            <select
              value={formData.board_id}
              onChange={(e) => setFormData(prev => ({ ...prev, board_id: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            >
              <option value="">Choose a board...</option>
              {boards.map(board => (
                <option key={board.id} value={board.id}>
                  {board.name} ({board.pin_count} pins)
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image *
            </label>
            <div className="space-y-4">
              <div>
                <label className="block w-full cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-500 transition-colors">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-600">Click to upload an image</p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 32MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="text-center text-sm text-gray-500">OR</div>

              <input
                type="url"
                value={formData.image_url.startsWith('data:') ? '' : formData.image_url}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, image_url: e.target.value }));
                  setImagePreview(null);
                }}
                placeholder="Enter image URL"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />

              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full h-auto rounded-lg border border-gray-300"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter pin title (max 100 characters)"
              maxLength={100}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            />
            <p className="mt-1 text-xs text-gray-500">{formData.title.length}/100 characters</p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter pin description (max 500 characters)"
              maxLength={500}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <p className="mt-1 text-xs text-gray-500">{formData.description.length}/500 characters</p>
          </div>

          {/* Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Destination Link
            </label>
            <input
              type="url"
              value={formData.link}
              onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
              placeholder="https://example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Scheduled Time */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <input
                type="date"
                value={formData.scheduled_date}
                onChange={(e) => setFormData(prev => ({ ...prev, scheduled_date: e.target.value }))}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time *
              </label>
              <input
                type="time"
                value={formData.scheduled_time}
                onChange={(e) => setFormData(prev => ({ ...prev, scheduled_time: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? 'Scheduling...' : 'Schedule Pin'}
            </button>
            <button
              type="button"
              onClick={handleScheduleNow}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Publish Now
            </button>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => navigate('/scheduled')}
              className="flex-1 bg-white text-gray-700 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              View Scheduled Pins
            </button>
            <button
              type="button"
              onClick={() => navigate('/bulk-upload')}
              className="flex-1 bg-white text-gray-700 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Bulk Upload CSV
            </button>
          </div>
        </form>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4">
          <h3 className="font-semibold text-blue-900 mb-2">📌 Pin Scheduling Tips</h3>
          <ul className="space-y-1 text-blue-800 text-sm">
            <li>• Images should be vertical (2:3 ratio recommended) for best results</li>
            <li>• Use clear, descriptive titles to improve discoverability</li>
            <li>• Add relevant keywords in your description</li>
            <li>• Include a destination link to drive traffic</li>
            <li>• Schedule pins during peak engagement times for your audience</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
