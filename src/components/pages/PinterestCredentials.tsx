import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface TokenInfo {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user_info: any;
}

export default function PinterestCredentials() {
  const navigate = useNavigate();
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [showTokens, setShowTokens] = useState(false);

  useEffect(() => {
    // Load token information from localStorage
    const accessToken = localStorage.getItem('pinterest_access_token');
    const refreshToken = localStorage.getItem('pinterest_refresh_token');
    const expiresAt = localStorage.getItem('pinterest_token_expires_at');
    const userInfoStr = localStorage.getItem('pinterest_user_info');

    if (!accessToken || !refreshToken) {
      // No credentials found, redirect to auth page
      navigate('/auth');
      return;
    }

    setTokenInfo({
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_at: expiresAt ? parseInt(expiresAt) : 0,
      user_info: userInfoStr ? JSON.parse(userInfoStr) : null,
    });
  }, [navigate]);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadCredentials = () => {
    if (!tokenInfo) return;

    const credentials = {
      access_token: tokenInfo.access_token,
      refresh_token: tokenInfo.refresh_token,
      expires_at: new Date(tokenInfo.expires_at).toISOString(),
      app_id: import.meta.env.VITE_PINTEREST_APP_ID,
      generated_at: new Date().toISOString(),
      user_info: tokenInfo.user_info,
    };

    const blob = new Blob([JSON.stringify(credentials, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pinterest-credentials-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getTimeRemaining = () => {
    if (!tokenInfo) return 'Unknown';
    const now = Date.now();
    const remaining = tokenInfo.expires_at - now;
    
    if (remaining <= 0) return 'Expired';
    
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  };

  const maskToken = (token: string) => {
    if (token.length <= 8) return '••••••••';
    return token.substring(0, 4) + '••••••••' + token.substring(token.length - 4);
  };

  if (!tokenInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-red-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Pinterest API Credentials
          </h1>
          <p className="text-xl text-gray-600">
            Use these credentials in your applications to access Pinterest API
          </p>
        </div>

        {/* User Info Card */}
        {tokenInfo.user_info && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Connected Account</h2>
            <div className="flex items-center space-x-4">
              {tokenInfo.user_info.profile_image && (
                <img
                  src={tokenInfo.user_info.profile_image}
                  alt="Profile"
                  className="w-16 h-16 rounded-full"
                />
              )}
              <div>
                <p className="font-semibold text-gray-900">{tokenInfo.user_info.username || 'Pinterest User'}</p>
                <p className="text-sm text-gray-600">Account ID: {tokenInfo.user_info.account_type || 'N/A'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Token Status */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Token Status</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Status</p>
              <p className="text-lg font-semibold text-green-600">Active</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Expires In</p>
              <p className="text-lg font-semibold text-gray-900">{getTimeRemaining()}</p>
            </div>
          </div>
        </div>

        {/* Credentials */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">API Credentials</h2>
            <button
              onClick={() => setShowTokens(!showTokens)}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              {showTokens ? 'Hide' : 'Show'} Tokens
            </button>
          </div>

          <div className="space-y-4">
            {/* App ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                App ID
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={localStorage.getItem('pinterest_app_id') || 'Not configured'}
                  readOnly
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
                />
                <button
                  onClick={() => copyToClipboard(localStorage.getItem('pinterest_app_id') || '', 'app_id')}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Copy to clipboard"
                >
                  {copied === 'app_id' ? (
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Access Token */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Access Token
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={showTokens ? tokenInfo.access_token : maskToken(tokenInfo.access_token)}
                  readOnly
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
                />
                <button
                  onClick={() => copyToClipboard(tokenInfo.access_token, 'access_token')}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Copy to clipboard"
                >
                  {copied === 'access_token' ? (
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Refresh Token */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Refresh Token
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={showTokens ? tokenInfo.refresh_token : maskToken(tokenInfo.refresh_token)}
                  readOnly
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
                />
                <button
                  onClick={() => copyToClipboard(tokenInfo.refresh_token, 'refresh_token')}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Copy to clipboard"
                >
                  {copied === 'refresh_token' ? (
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Actions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={downloadCredentials}
              className="flex items-center justify-center space-x-2 bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download as JSON</span>
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>View Dashboard</span>
            </button>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">How to Use These Credentials</h2>
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold mb-2">1. Making API Requests</h3>
              <p className="text-sm mb-2">Include the access token in your API requests:</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <code>
                  curl -X GET "https://api.pinterest.com/v5/user_account" \<br />
                  &nbsp;&nbsp;-H "Authorization: Bearer YOUR_ACCESS_TOKEN"
                </code>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">2. Refreshing Tokens</h3>
              <p className="text-sm">
                When your access token expires, use the refresh token to obtain a new one without requiring user re-authentication.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3. Security Best Practices</h3>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Never commit tokens to version control</li>
                <li>Store tokens securely (environment variables, secure vaults)</li>
                <li>Use HTTPS for all API requests</li>
                <li>Rotate tokens regularly</li>
                <li>Monitor token usage for suspicious activity</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Warning */}
        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Important:</strong> Keep these credentials secure. Anyone with access to your tokens can make API requests on your behalf.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
