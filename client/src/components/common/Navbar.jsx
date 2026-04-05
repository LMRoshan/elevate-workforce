import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const { user, logout, isEmployer, isJobSeeker, isAdmin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
    navigate('/')
  }

  const getDashboardLink = () => {
    if (isEmployer?.()) return '/employer/dashboard'
    if (isJobSeeker?.()) return '/dashboard'
    if (isAdmin?.()) return '/admin/dashboard'
    return '/dashboard'
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section - Reduced size on mobile (text-lg) */}
          <Link to="/" className="flex-shrink-0">
            <span className="font-headline font-bold text-[#1e3a8a] text-lg md:text-xl tracking-tight">
              Elevate Workforce Solutions
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-10 h-full">
            <Link 
              to={getDashboardLink()} 
              className={`relative h-full flex items-center font-body text-sm font-medium transition-colors ${
                isActive(getDashboardLink()) ? 'text-[#1e3a8a]' : 'text-slate-500 hover:text-[#1e3a8a]'
              }`}
            >
              Dashboard
              {isActive(getDashboardLink()) && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1e3a8a]" />
              )}
            </Link>

            <Link 
              to="/jobs" 
              className={`relative h-full flex items-center font-body text-sm font-medium transition-colors ${
                isActive('/jobs') ? 'text-[#1e3a8a]' : 'text-slate-500 hover:text-[#1e3a8a]'
              }`}
            >
              Search Jobs
              {isActive('/jobs') && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1e3a8a]" />
              )}
            </Link>

            <Link 
              to="/messages" 
              className={`relative h-full flex items-center font-body text-sm font-medium transition-colors ${
                isActive('/messages') ? 'text-[#1e3a8a]' : 'text-slate-500 hover:text-[#1e3a8a]'
              }`}
            >
              Messages
              {isActive('/messages') && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1e3a8a]" />
              )}
            </Link>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <Link 
                  to="/login" 
                  className="bg-[#f3f4f6] text-[#1e3a8a] text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-gray-200 transition-all"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-[#1e3a8a] text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-800 transition-all shadow-sm"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleLogout}
                  className="text-slate-500 text-sm font-medium hover:text-red-600"
                >
                  Logout
                </button>
                <div className="w-10 h-10 bg-[#1e3a8a] rounded-full flex items-center justify-center text-white font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className="text-gray-600 p-2 focus:outline-none"
            >
              {menuOpen ? (
                // "X" Icon when menu is open
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Burger Icon when menu is closed
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content (Shows when menuOpen is true) */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link 
              to={getDashboardLink()} 
              className={`block px-3 py-3 rounded-lg text-base font-medium ${isActive(getDashboardLink()) ? 'bg-blue-50 text-[#1e3a8a]' : 'text-slate-600'}`}
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/jobs" 
              className={`block px-3 py-3 rounded-lg text-base font-medium ${isActive('/jobs') ? 'bg-blue-50 text-[#1e3a8a]' : 'text-slate-600'}`}
              onClick={() => setMenuOpen(false)}
            >
              Search Jobs
            </Link>
            <Link 
              to="/messages" 
              className={`block px-3 py-3 rounded-lg text-base font-medium ${isActive('/messages') ? 'bg-blue-50 text-[#1e3a8a]' : 'text-slate-600'}`}
              onClick={() => setMenuOpen(false)}
            >
              Messages
            </Link>

            <div className="pt-4 border-t border-gray-100">
              {!user ? (
                <div className="flex flex-col space-y-3">
                  <Link 
                    to="/login" 
                    className="w-full text-center py-3 text-[#1e3a8a] font-semibold bg-gray-50 rounded-xl"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="w-full text-center py-3 bg-[#1e3a8a] text-white font-semibold rounded-xl"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                   <div className="flex items-center px-3 py-2 space-x-3 text-slate-700">
                    <div className="w-8 h-8 bg-[#1e3a8a] rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-3 text-red-600 font-medium hover:bg-red-50 rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar