import { useState, useEffect } from 'react';

export default function Settings() {
  const [appId, setAppId] = useState('');
  const [appSecret, setAppSecret] = useState('');
  const [redirectUri, setRedirectUri] = useState('');
  const [saved, setSaved] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  useEffect(() => {
    // Load saved settings from localStorage
    const savedAppId = localStorage.getItem('pinterest_app_id') || '';
    const savedAppSecret = localStorage.getItem('pinterest_app_secret') || '';
    const savedRedirectUri = localStorage.getItem('pinterest_redirect_uri') || window.location.origin + '/callback';
    
    setAppId(savedAppId);
    setAppSecret(savedAppSecret);
    setRedirectUri(savedRedirectUri);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage
    localStorage.setItem('pinterest_app_id', appId);
    localStorage.setItem('pinterest_app_secret', appSecret);
    localStorage.setItem('pinterest_redirect_uri', redirectUri);
    
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all settings? This will also disconnect your Pinterest account.')) {
      localStorage.removeItem('pinterest_app_id');
      localStorage.removeItem('pinterest_app_secret');
      localStorage.removeItem('pinterest_redirect_uri');
      localStorage.removeItem('pinterest_access_token');
      localStorage.removeItem('pinterest_refresh_token');
      localStorage.removeItem('pinterest_token_expires_at');
      localStorage.removeItem('pinterest_user_info');
      
      setAppId('');
      setAppSecret('');
      setRedirectUri(window.location.origin + '/callback');
    }
  };

  const isConfigured = appId && appSecret && redirectUri;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            API Settings
          </h1>
          <p className="text-xl text-gray-600">
            Configure your Pinterest API credentials
          </p>
        </div>

        {/* Status Card */}
        {isConfigured ? (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  <strong>API Configured!</strong> You're ready to connect your Pinterest account.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Configuration Required:</strong> Please enter your Pinterest API credentials below.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Settings Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <form onSubmit={handleSave} className="space-y-6">
            {/* App ID */}
            <div>
              <label htmlFor="appId" className="block text-sm font-medium text-gray-700 mb-2">
                Pinterest App ID <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="appId"
                value={appId}
                onChange={(e) => setAppId(e.target.value)}
                placeholder="Enter your Pinterest App ID"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Get this from your Pinterest app settings at{' '}
                <a
                  href="https://developers.pinterest.com/apps/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:underline"
                >
                  developers.pinterest.com/apps
                </a>
              </p>
            </div>

            {/* App Secret */}
            <div>
              <label htmlFor="appSecret" className="block text-sm font-medium text-gray-700 mb-2">
                Pinterest App Secret <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type={showSecret ? "text" : "password"}
                  id="appSecret"
                  value={appSecret}
                  onChange={(e) => setAppSecret(e.target.value)}
                  placeholder="Enter your Pinterest App Secret"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowSecret(!showSecret)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showSecret ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Keep this secret! Never share it publicly.
              </p>
            </div>

            {/* Redirect URI */}
            <div>
              <label htmlFor="redirectUri" className="block text-sm font-medium text-gray-700 mb-2">
                OAuth Redirect URI <span className="text-red-600">*</span>
              </label>
              <input
                type="url"
                id="redirectUri"
                value={redirectUri}
                onChange={(e) => setRedirectUri(e.target.value)}
                placeholder="https://yourdomain.com/callback"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                This must match exactly what you set in your Pinterest app settings. Current site: <code className="bg-gray-100 px-1 py-0.5 rounded">{window.location.origin}/callback</code>
              </p>
            </div>

            {/* Save Success Message */}
            {saved && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-green-800 font-medium">Settings saved successfully!</span>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Save Settings
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Clear All
              </button>
            </div>
          </form>
        </div>

        {/* Help Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Get Your Credentials</h3>
          <ol className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
              <div>
                <p>Visit <a href="https://developers.pinterest.com/apps/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Pinterest Developers</a> and sign in</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
              <div>
                <p>Create a new app or select an existing one</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
              <div>
                <p>Copy your <strong>App ID</strong> and <strong>App Secret</strong></p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">4</span>
              <div>
                <p>Add <code className="bg-gray-100 px-2 py-1 rounded">{window.location.origin}/callback</code> to your app's redirect URIs</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">5</span>
              <div>
                <p>Paste your credentials above and click "Save Settings"</p>
              </div>
            </li>
          </ol>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>💡 Tip:</strong> Your credentials are stored locally in your browser and never sent to any server. They're only used to communicate directly with Pinterest's API.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
