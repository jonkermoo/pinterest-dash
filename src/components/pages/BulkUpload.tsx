import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { schedulerService } from '../../services/schedulerService';

export default function BulkUpload() {
  const navigate = useNavigate();
  const [csvContent, setCsvContent] = useState('');
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{ success: number; errors: string[] } | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      alert('Please select a CSV file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setCsvContent(content);
    };
    reader.readAsText(file);
  };

  const handleUpload = () => {
    if (!csvContent.trim()) {
      alert('Please upload a CSV file or paste CSV content');
      return;
    }

    setUploading(true);
    setResult(null);

    try {
      const uploadResult = schedulerService.importFromCSV(csvContent);
      setResult(uploadResult);

      if (uploadResult.success > 0) {
        setTimeout(() => {
          navigate('/scheduled');
        }, 3000);
      }
    } catch (error) {
      setResult({
        success: 0,
        errors: [error instanceof Error ? error.message : 'Failed to process CSV'],
      });
    } finally {
      setUploading(false);
    }
  };

  const downloadTemplate = () => {
    const template = `board_id,title,description,link,image_url,scheduled_time
123456789,My Pin Title,This is a description of my pin,https://example.com,https://example.com/image.jpg,2026-12-31T12:00:00
123456789,Another Pin,Another description,https://example.com,https://example.com/image2.jpg,2026-12-31T14:00:00`;

    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pinterest_pins_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Bulk Upload Pins</h1>
          <p className="text-gray-600">
            Upload multiple pins at once using a CSV file
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">How to Use</h2>
          <ol className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="font-bold mr-2">1.</span>
              <span>Download the CSV template below</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">2.</span>
              <span>Fill in your pin details (board_id, title, description, etc.)</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">3.</span>
              <span>Upload the completed CSV file or paste the content</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">4.</span>
              <span>Review the results and check your scheduled pins</span>
            </li>
          </ol>

          <button
            onClick={downloadTemplate}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Download CSV Template</span>
          </button>
        </div>

        {/* CSV Format Info */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">📋 CSV Format</h3>
          <div className="text-blue-800 text-sm space-y-1">
            <p><strong>Required columns:</strong></p>
            <ul className="list-disc list-inside ml-4">
              <li><code>board_id</code> - Your Pinterest board ID</li>
              <li><code>title</code> - Pin title (max 100 characters)</li>
              <li><code>scheduled_time</code> - ISO 8601 format (e.g., 2026-12-31T12:00:00)</li>
            </ul>
            <p className="mt-2"><strong>Optional columns:</strong></p>
            <ul className="list-disc list-inside ml-4">
              <li><code>description</code> - Pin description (max 500 characters)</li>
              <li><code>link</code> - Destination URL</li>
              <li><code>image_url</code> - Direct image URL</li>
            </ul>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Upload CSV</h2>

          {/* File Upload */}
          <div className="mb-4">
            <label className="block w-full cursor-pointer">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-red-500 transition-colors">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="mt-2 text-sm text-gray-600">Click to upload CSV file</p>
                <p className="text-xs text-gray-500">or drag and drop</p>
              </div>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          <div className="text-center text-sm text-gray-500 mb-4">OR</div>

          {/* Text Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paste CSV Content
            </label>
            <textarea
              value={csvContent}
              onChange={(e) => setCsvContent(e.target.value)}
              placeholder="board_id,title,description,link,image_url,scheduled_time&#10;123456789,My Pin,Description,https://example.com,https://example.com/image.jpg,2026-12-31T12:00:00"
              rows={10}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono text-sm"
            />
          </div>

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={uploading || !csvContent.trim()}
            className="w-full mt-4 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {uploading ? 'Processing...' : 'Upload and Schedule Pins'}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Upload Results</h2>
            
            {result.success > 0 && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-medium">
                  ✓ Successfully scheduled {result.success} pin{result.success !== 1 ? 's' : ''}
                </p>
              </div>
            )}

            {result.errors.length > 0 && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-medium mb-2">
                  ✗ {result.errors.length} error{result.errors.length !== 1 ? 's' : ''} occurred:
                </p>
                <ul className="space-y-1 text-sm text-red-700">
                  {result.errors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}

            {result.success > 0 && (
              <div className="mt-4 text-center">
                <p className="text-gray-600 mb-3">Redirecting to scheduled pins...</p>
                <button
                  onClick={() => navigate('/scheduled')}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  View Scheduled Pins Now
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tips */}
        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4">
          <h3 className="font-semibold text-yellow-900 mb-2">💡 Tips for Bulk Upload</h3>
          <ul className="space-y-1 text-yellow-800 text-sm">
            <li>• Get board IDs from your Pinterest dashboard or API</li>
            <li>• Use ISO 8601 format for dates: YYYY-MM-DDTHH:MM:SS</li>
            <li>• Ensure image URLs are publicly accessible</li>
            <li>• Test with a small batch first before uploading many pins</li>
            <li>• Scheduled times must be in the future</li>
            <li>• Use quotes around values containing commas</li>
          </ul>
        </div>

        {/* Navigation */}
        <div className="mt-6 flex space-x-4">
          <button
            onClick={() => navigate('/schedule')}
            className="flex-1 px-6 py-3 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Schedule Single Pin
          </button>
          <button
            onClick={() => navigate('/scheduled')}
            className="flex-1 px-6 py-3 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            View Scheduled Pins
          </button>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
