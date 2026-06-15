import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Pinterest API Tool</h3>
            <p className="text-sm text-gray-600">
              A simple tool to obtain Pinterest API credentials and monitor your pin performance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-600 hover:text-red-600 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/setup" className="text-gray-600 hover:text-red-600 transition">
                  Setup Guide
                </Link>
              </li>
              <li>
                <Link to="/settings" className="text-gray-600 hover:text-red-600 transition">
                  Settings
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-600 hover:text-red-600 transition">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://developers.pinterest.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-red-600 transition"
                >
                  Pinterest Developers
                </a>
              </li>
              <li>
                <a
                  href="https://developers.pinterest.com/docs/api/v5/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-red-600 transition"
                >
                  API Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://policy.pinterest.com/en/developer-guidelines"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-red-600 transition"
                >
                  Developer Guidelines
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://policy.pinterest.com/en/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-red-600 transition"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://policy.pinterest.com/en/terms-of-service"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-red-600 transition"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600 text-center md:text-left">
              © {new Date().getFullYear()} Pinterest API Tool. Not affiliated with Pinterest, Inc.
            </p>
            <p className="text-sm text-gray-600 text-center md:text-right">
              Built with React, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Made with Bob
