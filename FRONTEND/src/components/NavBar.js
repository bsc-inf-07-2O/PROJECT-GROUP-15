import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import { useAuth } from "./Authentication";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { logout } = useAuth();

  const logoutUser = () => {
    // Handle logout logic here (e.g., clear session, tokens)
    logout();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Change this line
        setUser({
          firstName: decodedToken.FirstName,
          surName: decodedToken.SurName,
        });
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, []);

  const handleSidebarToggle = () => setSidebar(!sidebar);
  
  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };


  return (
    <header>
      <nav className="bg-gray-800 h-16 flex justify-between items-center px-4 sm:px-8 shadow-md sticky top-0 z-50">
        <div className="flex items-center">
          <img
            src="/images/logo.png"
            alt="Company Logo"
            className="h-10 mr-4"
          />
        </div>
        <div className="sm:hidden">
          <button
            onClick={handleSidebarToggle}
            className="text-white focus:outline-none"
          >
            <i className={sidebar ? "fas fa-times" : "fas fa-bars"}></i>
          </button>
        </div>
        <ul className="hidden sm:flex space-x-8">
          <li>
            <Link to="/dashboard" className="text-white hover:text-yellow-400">
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/bonding-form"
              className="text-white hover:text-yellow-400"
            >
              Bonding
            </Link>
          </li>
          <li>
            <Link to="/my-bonding" className="text-white hover:text-yellow-400">
              Bonding Status
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-white hover:text-yellow-400">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/terms" className="text-white hover:text-yellow-400">
              Terms
            </Link>
          </li>
          <li>
            <Link to="/message" className="relative mr-6">
              <i className="fas fa-envelope text-white"></i>
            </Link>
          </li>
        </ul>
        <div className="hidden sm:flex items-center relative">
          {user ? (
            <div className="relative dropdown-menu">
              <button
                className="text-white flex items-center focus:outline-none"
                onClick={handleDropdownToggle}
              >
                <span>
                  {user.firstName} {user.surName}
                </span>
                <i className="fas fa-caret-down ml-2"></i>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                  <Link
                    to="/user-guide"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  >
                    <i className="fas fa-book mr-2"></i>User Guide
                  </Link>
                  <Link
                    to="/account-settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  >
                    <i className="fas fa-cog"></i> Account Settings
                  </Link>
                  <button
                    onClick={logoutUser}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  >
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/" className="text-white hover:text-yellow-400">
              Login
            </Link>
          )}
        </div>
      </nav>

      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 w-64 transform ${
          sidebar ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 sm:hidden`}
      >
        <div className="flex flex-col h-full p-4">
          <ul className="text-white mt-6">
            <li className="mb-4">
              <Link
                to="/dashboard"
                className="hover:text-yellow-400 text-lg block"
                onClick={handleSidebarToggle}
              >
                Dashboard
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/bonding-form"
                className="hover:text-yellow-400 text-lg block"
                onClick={handleSidebarToggle}
              >
                Bonding
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/my-bonding"
                className="hover:text-yellow-400 text-lg block"
                onClick={handleSidebarToggle}
              >
                My Bonding
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/contact"
                className="hover:text-yellow-400 text-lg block"
                onClick={handleSidebarToggle}
              >
                Contact
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/terms"
                className="hover:text-yellow-400 text-lg block"
                onClick={handleSidebarToggle}
              >
                Terms
              </Link>
            </li>
            <div className="mt-auto">
              <div className="relative mb-4">
                <i className="fas fa-envelope text-white"></i>
                <Link
                  to="/message"
                  className="text-white hover:text-yellow-400 ml-2"
                  onClick={handleSidebarToggle}
                >
                  Messages
                </Link>
              </div>
              <div className="mb-4">
                <Link
                  to="/account-settings"
                  className="text-white hover:text-yellow-400"
                  onClick={handleSidebarToggle}
                >
                  <i className="fas fa-cog"></i> Account Settings
                </Link>
              </div>
            </div>
          </ul>
        </div>
      </div>
      {sidebar && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={handleSidebarToggle}
        ></div>
      )}
    </header>
  );
};

export default Navbar;
