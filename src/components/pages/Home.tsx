import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Pinterest API Integration Made Simple
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Authenticate with Pinterest, obtain API credentials, and monitor your pin performance—all in one place.
            No backend required, everything runs in your browser.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/settings"
              className="px-8 py-4 bg-red-600 text-white rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors shadow-lg"
            >
              Get Started
            </Link>
            <Link
              to="/setup"
              className="px-8 py-4 bg-white text-red-600 rounded-lg font-semibold text-lg border-2 border-red-600 hover:bg-red-50 transition-colors shadow-lg"
            >
              Setup Guide
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Secure OAuth</h3>
            <p className="text-gray-600">
              Connect your Pinterest account securely using OAuth 2.0 authentication with CSRF protection. All credentials stored locally in your browser.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Easy Setup</h3>
            <p className="text-gray-600">
              Simply enter your Pinterest App ID and Secret in the settings. No environment files, no backend server, no deployment complexity.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Monitor Pins</h3>
            <p className="text-gray-600">
              Track impressions, saves, clicks, and engagement metrics for all your pins and boards with real-time analytics.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl shadow-lg p-12 mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">How It Works</h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Create App</h4>
              <p className="text-sm text-gray-600">Create a Pinterest app and get your App ID & Secret</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Configure</h4>
              <p className="text-sm text-gray-600">Enter credentials in Settings page</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Connect</h4>
              <p className="text-sm text-gray-600">Authenticate with Pinterest OAuth</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                4
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Monitor</h4>
              <p className="text-sm text-gray-600">View analytics and export credentials</p>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="bg-white rounded-xl shadow-lg p-12 mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Use This Tool?</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">No Backend Required</h4>
                <p className="text-sm text-gray-600">Everything runs in your browser. No server setup needed.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Privacy First</h4>
                <p className="text-sm text-gray-600">Your credentials never leave your browser.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Easy Deployment</h4>
                <p className="text-sm text-gray-600">Deploy to any static hosting service in minutes.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Export Credentials</h4>
                <p className="text-sm text-gray-600">Download tokens for use in your own applications.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Real-time Analytics</h4>
                <p className="text-sm text-gray-600">Monitor pin performance with live data.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Compliance Ready</h4>
                <p className="text-sm text-gray-600">Built following Pinterest's API guidelines.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-xl shadow-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-xl mb-8 opacity-90">
            Configure your Pinterest API credentials and start monitoring your pins in minutes.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/settings"
              className="inline-block px-8 py-4 bg-white text-red-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Configure Now
            </Link>
            <Link
              to="/setup"
              className="inline-block px-8 py-4 bg-red-700 text-white rounded-lg font-semibold text-lg hover:bg-red-800 transition-colors shadow-lg border-2 border-white"
            >
              View Guide
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
