import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Search from "./Search";
import ResultProfile from "../Profile/ResultProfile"; // Import ResultProfile

function Navbar() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null); // Store selected user profile
  const navigate = useNavigate();
  const location = useLocation(); // Use location to check the current route

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    window.location.reload();
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleResultClick = (userId) => {
    setSelectedId(userId); // Set selected user profile
  };

  // Check if the current route is for login or signup
  const isAuthPage = ["/", "/signup"].includes(location.pathname);

  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a className="text-white text-xl font-bold" href="/dashboard">
            Experts
          </a>
          {!isAuthPage && (
            <div className="flex-grow flex justify-center">
              <Search onResultClick={handleResultClick} /> {/* Pass handleResultClick to Search */}
            </div>
          )}
          <div className="flex items-center space-x-6">
            {isAuthPage ? (
              <>
                {/* Navbar for login/signup pages */}
                <Link
                  className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
                  to="/signup"
                >
                  Sign Up
                </Link>
                <Link
                  className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
                  to="/"
                >
                  Login
                </Link>
              </>
            ) : user ? (
              <>
                {/* Navbar for authenticated users */}
                <div className="relative">
                  <Link
                    className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
                    to="/people"
                  >
                    People
                  </Link>
                  <button
                    className="bg-gray-700 text-white px-3 py-2 rounded-md"
                    onClick={toggleDropdown}
                  >
                    {user.first_name}
                  </button>
                  {isOpen && (
                    <div className="absolute right-0 mt-2 bg-gray-800 text-white rounded-md shadow-lg w-40">
                      <Link
                        className="block px-4 py-2 text-sm hover:bg-gray-700"
                        to="/view"
                      >
                        View Profile
                      </Link>
                      <Link
                        className="block px-4 py-2 text-sm hover:bg-gray-700"
                        to="/edit"
                      >
                        Edit Profile
                      </Link>
                      <Link
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm hover:bg-gray-700"
                      >
                        Logout
                      </Link>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Navbar for unauthenticated users */}
                <Link
                  className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
                  to="/signup"
                >
                  Sign Up
                </Link>
                <Link
                  className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
                  to="/"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
