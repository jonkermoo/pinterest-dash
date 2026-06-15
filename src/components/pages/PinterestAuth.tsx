import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { pinterestApi } from '../../services/pinterestApi';

export default function PinterestAuth() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if API is configured
    setIsConfigured(pinterestApi.isConfigured());
    
    // Check if user already has a token stored
    const token = localStorage.getItem('pinterest_access_token');
    if (token) {
      setIsConnected(true);
    }
  }, []);

  const handleConnect = () => {
    try {
      setLoading(true);
      setError(null);
      
      // Generate and store state for CSRF protection
      const state = Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem('pinterest_oauth_state', state);
      
      // Redirect to Pinterest OAuth
      const authUrl = pinterestApi.getAuthorizationUrl(state);
      window.location.href = authUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initiate authentication');
      setLoading(false);
    }
  };

  const handleDisconnect = () => {
    localStorage.removeItem('pinterest_access_token');
    localStorage.removeItem('pinterest_refresh_token');
    localStorage.removeItem('pinterest_token_expires_at');
    localStorage.removeItem('pinterest_user_info');
    setIsConnected(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 19c-.721 0-1.418-.109-2.073-.312.286-.465.713-1.227.713-1.227s.366.696 1.145.696c1.878 0 3.215-1.948 3.215-4.538 0-2.299-1.247-4.003-3.119-4.003-2.339 0-3.521 1.671-3.521 3.438 0 .943.357 1.782.943 2.093.096.049.146.027.168-.073.018-.076.111-.451.154-.623.014-.057.007-.107-.039-.162-.247-.301-.445-.854-.445-1.368 0-1.317.989-2.572 2.663-2.572 1.453 0 2.515.994 2.515 2.4 0 1.611-.819 2.724-1.875 2.724-.573 0-1.001-.474-.864-1.056.164-.694.483-1.444.483-1.944 0-.449-.241-.824-.741-.824-.587 0-1.059.608-1.059 1.422 0 .518.175.868.175.868s-.588 2.49-.698 2.939c-.131.535-.078 1.237-.021 1.741C6.836 18.096 4 15.39 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Connect to Pinterest
          </h1>
          <p className="text-xl text-gray-600">
            Authenticate with Pinterest to access your pin analytics and monitoring tools
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {!isConfigured ? (
            <div className="space-y-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <h3 className="font-semibold text-yellow-900 mb-2">⚠️ API Not Configured</h3>
                <p className="text-yellow-800 text-sm mb-3">
                  You need to configure your Pinterest API credentials before connecting your account.
                </p>
                <Link
                  to="/settings"
                  className="inline-block px-4 py-2 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
                >
                  Go to Settings
                </Link>
              </div>
            </div>
          ) : !isConnected ? (
            <div className="space-y-6">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Before You Connect</h3>
                <ul className="space-y-1 text-blue-800 text-sm">
                  <li>• Make sure you've completed the setup guide</li>
                  <li>• Your Pinterest app must be configured with the correct redirect URI</li>
                  <li>• You'll be redirected to Pinterest to authorize this application</li>
                  <li>• After authorization, you'll receive an access token for API calls</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">What You'll Get Access To:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Read Boards</p>
                      <p className="text-sm text-gray-600">Access your board information</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Read Pins</p>
                      <p className="text-sm text-gray-600">View your pin data</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Analytics</p>
                      <p className="text-sm text-gray-600">Access performance metrics</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">User Account</p>
                      <p className="text-sm text-gray-600">Read account information</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={handleConnect}
                  disabled={loading}
                  className="w-full bg-red-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 19c-.721 0-1.418-.109-2.073-.312.286-.465.713-1.227.713-1.227s.366.696 1.145.696c1.878 0 3.215-1.948 3.215-4.538 0-2.299-1.247-4.003-3.119-4.003-2.339 0-3.521 1.671-3.521 3.438 0 .943.357 1.782.943 2.093.096.049.146.027.168-.073.018-.076.111-.451.154-.623.014-.057.007-.107-.039-.162-.247-.301-.445-.854-.445-1.368 0-1.317.989-2.572 2.663-2.572 1.453 0 2.515.994 2.515 2.4 0 1.611-.819 2.724-1.875 2.724-.573 0-1.001-.474-.864-1.056.164-.694.483-1.444.483-1.944 0-.449-.241-.824-.741-.824-.587 0-1.059.608-1.059 1.422 0 .518.175.868.175.868s-.588 2.49-.698 2.939c-.131.535-.078 1.237-.021 1.741C6.836 18.096 4 15.39 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                      </svg>
                      <span>Connect to Pinterest</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-center text-sm text-gray-600">
                <p>
                  By connecting, you agree to Pinterest's{' '}
                  <a href="https://policy.pinterest.com/en/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">
                    Terms of Service
                  </a>
                  {' '}and{' '}
                  <a href="https://policy.pinterest.com/en/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-green-50 border-l-4 border-green-500 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Successfully Connected!</h3>
                    <p className="mt-2 text-sm text-green-700">
                      Your Pinterest account is now connected. You can view your credentials and access the monitoring dashboard.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <a
                  href="/dashboard"
                  className="block w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold text-center hover:bg-red-700 transition-colors"
                >
                  Go to Dashboard
                </a>
                <a
                  href="/credentials"
                  className="block w-full bg-gray-100 text-gray-900 py-3 px-6 rounded-lg font-semibold text-center hover:bg-gray-200 transition-colors"
                >
                  View Credentials
                </a>
                <button
                  onClick={handleDisconnect}
                  className="w-full bg-white text-red-600 py-3 px-6 rounded-lg font-semibold border-2 border-red-600 hover:bg-red-50 transition-colors"
                >
                  Disconnect Account
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Connection Issues?</strong> Make sure your Pinterest app is properly configured with the correct redirect URI.
            </p>
            <p>
              <strong>Missing Credentials?</strong> Check that your .env file contains valid VITE_PINTEREST_APP_ID and VITE_PINTEREST_APP_SECRET values.
            </p>
            <p>
              <strong>Need Setup Help?</strong>{' '}
              <a href="/setup" className="text-red-600 hover:underline">
                View the setup guide
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
