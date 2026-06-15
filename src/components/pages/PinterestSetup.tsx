import { useState } from 'react';

export default function PinterestSetup() {
  const [activeTab, setActiveTab] = useState<'overview' | 'setup' | 'compliance'>('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pinterest API Integration Guide
          </h1>
          <p className="text-xl text-gray-600">
            Get your Pinterest API credentials and start monitoring your pins
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('setup')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'setup'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Setup Guide
            </button>
            <button
              onClick={() => setActiveTab('compliance')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'compliance'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Compliance
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'setup' && <SetupTab />}
            {activeTab === 'compliance' && <ComplianceTab />}
          </div>
        </div>
      </div>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What This Tool Does</h2>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-blue-900">
            This website helps you obtain Pinterest API credentials through OAuth authentication.
            Once authenticated, you can use these credentials in your own applications to monitor
            pin performance and analytics.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">✅ What You Get</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Access Token for API calls</li>
              <li>• Refresh Token for long-term access</li>
              <li>• Pin analytics monitoring</li>
              <li>• Board performance metrics</li>
              <li>• Account-level statistics</li>
              <li>• Exportable credentials</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">📊 Available Metrics</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Impressions</li>
              <li>• Saves (Repins)</li>
              <li>• Pin clicks</li>
              <li>• Outbound clicks</li>
              <li>• Engagement rates</li>
              <li>• Time-series data</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Create Pinterest App</h3>
              <p className="text-gray-600">
                Register your application on Pinterest Developer Portal to get App ID and Secret
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Configure This Website</h3>
              <p className="text-gray-600">
                Add your credentials to the .env file and set up the redirect URI
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Authenticate</h3>
              <p className="text-gray-600">
                Connect your Pinterest account through OAuth to get access tokens
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
              4
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Monitor & Export</h3>
              <p className="text-gray-600">
                View analytics in the dashboard and export credentials for use elsewhere
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
        <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Important Notes</h3>
        <ul className="space-y-1 text-yellow-800 text-sm">
          <li>• Access tokens expire after a certain period (check Pinterest docs for current duration)</li>
          <li>• Use refresh tokens to obtain new access tokens without re-authentication</li>
          <li>• Keep your App Secret secure - never commit it to public repositories</li>
          <li>• Comply with Pinterest's API Terms of Service and rate limits</li>
        </ul>
      </div>
    </div>
  );
}

function SetupTab() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Step-by-Step Setup Guide</h2>
        
        <div className="space-y-6">
          {/* Step 1 */}
          <div className="border-l-4 border-red-600 pl-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Step 1: Create a Pinterest Developer Account
            </h3>
            <ol className="space-y-3 text-gray-700">
              <li>
                <strong>1.1</strong> Go to{' '}
                <a
                  href="https://developers.pinterest.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:underline"
                >
                  Pinterest Developers
                </a>
              </li>
              <li>
                <strong>1.2</strong> Sign in with your Pinterest account (or create one if needed)
              </li>
              <li>
                <strong>1.3</strong> Accept the Pinterest Developer Terms of Service
              </li>
            </ol>
          </div>

          {/* Step 2 */}
          <div className="border-l-4 border-red-600 pl-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Step 2: Create Your App
            </h3>
            <ol className="space-y-3 text-gray-700">
              <li>
                <strong>2.1</strong> Navigate to{' '}
                <a
                  href="https://developers.pinterest.com/apps/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:underline"
                >
                  My Apps
                </a>
              </li>
              <li>
                <strong>2.2</strong> Click "Create app" button
              </li>
              <li>
                <strong>2.3</strong> Fill in the application details:
                <ul className="ml-6 mt-2 space-y-1">
                  <li>• <strong>App name:</strong> Choose a descriptive name (e.g., "Pin Monitor")</li>
                  <li>• <strong>App description:</strong> Describe your monitoring use case</li>
                  <li>• <strong>App website:</strong> Your website URL</li>
                </ul>
              </li>
              <li>
                <strong>2.4</strong> Submit your app for review (required for production access)
              </li>
            </ol>
          </div>

          {/* Step 3 */}
          <div className="border-l-4 border-red-600 pl-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Step 3: Configure OAuth Settings
            </h3>
            <ol className="space-y-3 text-gray-700">
              <li>
                <strong>3.1</strong> In your app settings, find the OAuth section
              </li>
              <li>
                <strong>3.2</strong> Add redirect URIs:
                <div className="bg-gray-100 p-3 rounded mt-2 font-mono text-sm">
                  <div>Development: http://localhost:5173/callback</div>
                  <div className="mt-1">Production: https://yourdomain.com/callback</div>
                </div>
              </li>
              <li>
                <strong>3.3</strong> Copy your <strong>App ID</strong> and <strong>App Secret</strong>
              </li>
            </ol>
          </div>

          {/* Step 4 */}
          <div className="border-l-4 border-red-600 pl-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Step 4: Configure This Website
            </h3>
            <ol className="space-y-3 text-gray-700">
              <li>
                <strong>4.1</strong> Create a <code className="bg-gray-100 px-2 py-1 rounded">.env</code> file in the project root
              </li>
              <li>
                <strong>4.2</strong> Copy the contents from <code className="bg-gray-100 px-2 py-1 rounded">.env.example</code>
              </li>
              <li>
                <strong>4.3</strong> Replace the placeholder values with your actual credentials:
                <div className="bg-gray-900 text-gray-100 p-4 rounded mt-2 font-mono text-sm overflow-x-auto">
                  <div>VITE_PINTEREST_APP_ID=your_actual_app_id</div>
                  <div>VITE_PINTEREST_APP_SECRET=your_actual_app_secret</div>
                  <div>VITE_PINTEREST_REDIRECT_URI=http://localhost:5173/callback</div>
                </div>
              </li>
              <li>
                <strong>4.4</strong> Save the file and restart your development server
              </li>
            </ol>
          </div>

          {/* Step 5 */}
          <div className="border-l-4 border-red-600 pl-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Step 5: Test Authentication
            </h3>
            <ol className="space-y-3 text-gray-700">
              <li>
                <strong>5.1</strong> Navigate to the "Connect Pinterest" page
              </li>
              <li>
                <strong>5.2</strong> Click "Connect to Pinterest" button
              </li>
              <li>
                <strong>5.3</strong> Authorize the app on Pinterest
              </li>
              <li>
                <strong>5.4</strong> You'll be redirected back with your access token
              </li>
            </ol>
          </div>
        </div>
      </section>

      <div className="bg-green-50 border-l-4 border-green-500 p-4">
        <h3 className="font-semibold text-green-900 mb-2">✅ Setup Complete!</h3>
        <p className="text-green-800">
          Once you've completed these steps, you're ready to authenticate and start monitoring your pins.
          Head to the "Connect Pinterest" page to begin.
        </p>
      </div>
    </div>
  );
}

function ComplianceTab() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Pinterest API Terms & Compliance
        </h2>
        
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-900 font-semibold">
            ⚠️ You must comply with Pinterest's API Terms of Service and Developer Guidelines
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Required Compliance Items</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <div>
                  <strong>API Terms of Service:</strong> Read and accept{' '}
                  <a
                    href="https://policy.pinterest.com/en/developer-guidelines"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:underline"
                  >
                    Pinterest Developer Guidelines
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <div>
                  <strong>Rate Limits:</strong> Respect Pinterest's API rate limits (typically 1000 requests per hour per user)
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <div>
                  <strong>Data Usage:</strong> Only use data for the purposes stated in your app description
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <div>
                  <strong>User Privacy:</strong> Protect user data and comply with privacy regulations (GDPR, CCPA, etc.)
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <div>
                  <strong>Branding:</strong> Follow Pinterest's brand guidelines when displaying their logo or content
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">App Review Requirements</h3>
            <p className="text-gray-700 mb-3">
              Pinterest requires app review for production access. Your app must:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✓</span>
                <span>Have a clear, legitimate use case</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✓</span>
                <span>Include a privacy policy on your website</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✓</span>
                <span>Include terms of service</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✓</span>
                <span>Clearly explain what data you'll access and why</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✓</span>
                <span>Demonstrate compliance with Pinterest's guidelines</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Prohibited Activities</h3>
            <div className="bg-gray-50 p-4 rounded">
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span>Scraping or bulk downloading Pinterest content</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span>Creating spam or misleading content</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span>Selling or sharing access tokens</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span>Circumventing rate limits or security measures</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span>Using data for purposes not disclosed to users</span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Best Practices</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Cache API responses to minimize requests</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Implement proper error handling</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Use refresh tokens to maintain long-term access</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Monitor your API usage and stay within limits</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Keep your App Secret secure</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
        <h3 className="font-semibold text-blue-900 mb-2">📚 Additional Resources</h3>
        <ul className="space-y-1 text-blue-800">
          <li>
            •{' '}
            <a
              href="https://developers.pinterest.com/docs/getting-started/introduction/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Pinterest API Documentation
            </a>
          </li>
          <li>
            •{' '}
            <a
              href="https://policy.pinterest.com/en/developer-guidelines"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Developer Guidelines
            </a>
          </li>
          <li>
            •{' '}
            <a
              href="https://developers.pinterest.com/docs/api/v5/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              API v5 Reference
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

// Made with Bob
