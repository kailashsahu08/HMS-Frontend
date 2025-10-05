import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { Menu, X, User, LogOut, Settings } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const { pathname } = useLocation();

  // Navigation items
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/doctors", label: "Doctors" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  // User menu items
  const userMenuItems = [
    { path: "/profile", label: "Profile", icon: User },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  const getNavLinkClass = (path, isMobile = false) => {
    const isActive = pathname === path;
    const baseClass = isMobile 
      ? "block px-3 py-2 text-base font-medium rounded-md transition-colors" 
      : "px-3 py-2 text-sm font-medium transition-colors";
    
    if (isActive) {
      return `${baseClass} text-green-600 ${isMobile ? "bg-green-50" : ""}`;
    }
    return `${baseClass} text-gray-600 hover:text-gray-900 ${isMobile ? "hover:bg-gray-50" : ""}`;
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const closeUserMenu = () => setIsUserMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeUserMenu();
    closeMobileMenu();
  };

  const renderNavLinks = (isMobile = false) => (
    <>
      {navItems.map(({ path, label }) => (
        <Link
          key={path}
          to={path}
          className={getNavLinkClass(path, isMobile)}
          onClick={isMobile ? closeMobileMenu : undefined}
        >
          {label}
        </Link>
      ))}
    </>
  );

  const renderUserMenu = () => (
    <div className="relative">
      <button
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
      >
        <User className="h-4 w-4" />
        <span className="hidden md:inline">{user?.name || "Profile"}</span>
      </button>

      {isUserMenuOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={closeUserMenu} />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
            {userMenuItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={closeUserMenu}
              >
                <Icon className="h-4 w-4 mr-3" />
                {label}
              </Link>
            ))}
            <hr className="my-1 border-gray-100" />
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );

  const renderAuthButtons = (isMobile = false) => (
    <>
      <Link
        to="/login"
        className={isMobile 
          ? "block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
          : "hidden md:block text-gray-600 hover:text-gray-900 text-sm font-medium px-3 py-2 transition-colors"
        }
        onClick={isMobile ? closeMobileMenu : undefined}
      >
        Log In
      </Link>
      <Link
        to="/signup"
        className={isMobile 
          ? "block px-3 py-2 text-base font-medium bg-black text-white rounded-md hover:bg-gray-800 transition-colors text-center"
          : "hidden md:block bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800 transition-colors"
        }
        onClick={isMobile ? closeMobileMenu : undefined}
      >
        Sign Up
      </Link>
    </>
  );

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 shadow-sm bg-white">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex flex-row">
            <Link to="/" className="flex items-center">
              <img src="/logo.svg" alt="Logo" className="h-16 object-contain" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {renderNavLinks()}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="hidden md:inline-flex text-gray-600 hover:text-gray-900 text-sm font-medium px-3 py-2 transition-colors"
                >
                  Dashboard
                </Link>
                {renderUserMenu()}
              </>
            ) : (
              renderAuthButtons()
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="relative z-50 bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {renderNavLinks(true)}
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </Link>
                {userMenuItems.map(({ path, label }) => (
                  <Link
                    key={path}
                    to={path}
                    className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={closeMobileMenu}
                  >
                    {label}
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              renderAuthButtons(true)
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40  transition-opacity duration-300 ease-in-out bg-opacity-25 md:hidden" 
          onClick={closeMobileMenu} 
        />
      )}
    </nav>
  );
};

export default Header;