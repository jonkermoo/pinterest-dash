import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 font-semibold transition ${
      isActive ? "text-red-600 border-b-2 border-red-600" : "text-gray-700 hover:text-red-600"
    }`;

  return (
    <header className="sticky top-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 19c-.721 0-1.418-.109-2.073-.312.286-.465.713-1.227.713-1.227s.366.696 1.145.696c1.878 0 3.215-1.948 3.215-4.538 0-2.299-1.247-4.003-3.119-4.003-2.339 0-3.521 1.671-3.521 3.438 0 .943.357 1.782.943 2.093.096.049.146.027.168-.073.018-.076.111-.451.154-.623.014-.057.007-.107-.039-.162-.247-.301-.445-.854-.445-1.368 0-1.317.989-2.572 2.663-2.572 1.453 0 2.515.994 2.515 2.4 0 1.611-.819 2.724-1.875 2.724-.573 0-1.001-.474-.864-1.056.164-.694.483-1.444.483-1.944 0-.449-.241-.824-.741-.824-.587 0-1.059.608-1.059 1.422 0 .518.175.868.175.868s-.588 2.49-.698 2.939c-.131.535-.078 1.237-.021 1.741C6.836 18.096 4 15.39 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">PinScheduler</h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/schedule" className={navLinkClass}>
              Schedule
            </NavLink>
            <NavLink to="/scheduled" className={navLinkClass}>
              My Pins
            </NavLink>
            <NavLink to="/dashboard" className={navLinkClass}>
              Analytics
            </NavLink>
            <NavLink to="/settings" className={navLinkClass}>
              Settings
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition ${
                    isActive ? "bg-red-50 text-red-600 font-semibold" : "text-gray-700 hover:bg-gray-50"
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/schedule"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition ${
                    isActive ? "bg-red-50 text-red-600 font-semibold" : "text-gray-700 hover:bg-gray-50"
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                Schedule Pin
              </NavLink>
              <NavLink
                to="/scheduled"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition ${
                    isActive ? "bg-red-50 text-red-600 font-semibold" : "text-gray-700 hover:bg-gray-50"
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                My Scheduled Pins
              </NavLink>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition ${
                    isActive ? "bg-red-50 text-red-600 font-semibold" : "text-gray-700 hover:bg-gray-50"
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                Analytics
              </NavLink>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition ${
                    isActive ? "bg-red-50 text-red-600 font-semibold" : "text-gray-700 hover:bg-gray-50"
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                Settings
              </NavLink>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

// Made with Bob
