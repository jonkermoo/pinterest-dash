import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { pinterestApi } from '../../services/pinterestApi';

export default function PinterestCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [error, setError] = useState<string | null>(null);
  const [tokenData, setTokenData] = useState<any>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get authorization code from URL
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const errorParam = searchParams.get('error');

        // Check for errors from Pinterest
        if (errorParam) {
          throw new Error(`Pinterest authorization failed: ${errorParam}`);
        }

        if (!code) {
          throw new Error('No authorization code received');
        }

        // Verify state for CSRF protection
        const savedState = sessionStorage.getItem('pinterest_oauth_state');
        if (state !== savedState) {
          throw new Error('Invalid state parameter - possible CSRF attack');
        }

        // Exchange code for access token
        setStatus('processing');
        const tokenResponse = await pinterestApi.exchangeCodeForToken(code);

        // Store tokens securely
        localStorage.setItem('pinterest_access_token', tokenResponse.access_token);
        localStorage.setItem('pinterest_refresh_token', tokenResponse.refresh_token);
        
        // Calculate and store expiration time
        const expiresAt = Date.now() + (tokenResponse.expires_in * 1000);
        localStorage.setItem('pinterest_token_expires_at', expiresAt.toString());

        // Get user account info
        const userInfo = await pinterestApi.getUserAccount(tokenResponse.access_token);
        localStorage.setItem('pinterest_user_info', JSON.stringify(userInfo));

        // Clean up session storage
        sessionStorage.removeItem('pinterest_oauth_state');

        setTokenData(tokenResponse);
        setStatus('success');

        // Redirect to credentials page after 2 seconds
        setTimeout(() => {
          navigate('/credentials');
        }, 2000);

      } catch (err) {
        console.error('OAuth callback error:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setStatus('error');
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {status === 'processing' && (
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <svg className="animate-spin h-16 w-16 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Connecting to Pinterest...
              </h2>
              <p className="text-gray-600">
                Please wait while we complete the authentication process.
              </p>
              <div className="mt-6 space-y-2 text-sm text-gray-500">
                <p>✓ Verifying authorization code</p>
                <p>✓ Exchanging for access token</p>
                <p>✓ Retrieving account information</p>
              </div>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Successfully Connected!
              </h2>
              <p className="text-gray-600 mb-6">
                Your Pinterest account has been connected successfully.
              </p>
              
              {tokenData && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                  <h3 className="font-semibold text-gray-900 mb-2">Connection Details:</h3>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p>• Access token received</p>
                    <p>• Refresh token stored</p>
                    <p>• Token expires in: {Math.floor(tokenData.expires_in / 3600)} hours</p>
                    <p>• Scopes: {tokenData.scope}</p>
                  </div>
                </div>
              )}

              <p className="text-sm text-gray-500">
                Redirecting to credentials page...
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Connection Failed
              </h2>
              <p className="text-gray-600 mb-6">
                We couldn't complete the Pinterest authentication.
              </p>
              
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 text-left">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={() => navigate('/auth')}
                  className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={() => navigate('/setup')}
                  className="w-full bg-gray-100 text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  View Setup Guide
                </button>
              </div>

              <div className="mt-6 text-sm text-gray-600">
                <p className="font-semibold mb-2">Common Issues:</p>
                <ul className="text-left space-y-1">
                  <li>• Check your .env configuration</li>
                  <li>• Verify redirect URI matches Pinterest app settings</li>
                  <li>• Ensure App ID and Secret are correct</li>
                  <li>• Make sure your Pinterest app is approved (for production)</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Made with Bob
