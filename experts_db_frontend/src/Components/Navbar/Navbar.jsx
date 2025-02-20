import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Search from "./Search";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; 

function Navbar() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("jwt_token");

      if (token) {
        try {
          const decoded = jwtDecode(token);
          const user_id = decoded.sub; 

          const response = await axios.get(`http://localhost:4000/api/v1/users/${user_id}`, {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          });

          setUser(response.data.user);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          localStorage.removeItem("jwt_token"); 
          navigate("/"); 
        }
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    setUser(null);
    navigate("/");
    window.location.reload();
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleResultClick = (userId) => {
    setSelectedId(userId); 
  };

  const isAuthPage = ["/", "/signup"].includes(location.pathname);

  return (
    <div>
      <nav className="bg-gray-800 p-4 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a className="text-white text-xl font-bold" 
          href={user ? "/dashboard" : "/"}
          onClick={(e) => {
            if (!user) {
              e.preventDefault(); 
            }
          }}>
            Experts
          </a>
          {!isAuthPage && (
            <div className="flex-grow flex justify-center">
              <Search onResultClick={handleResultClick} /> 
            </div>
          )}
          <div className="flex items-center space-x-6">
            {isAuthPage ? (
              <>
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
                    <div className="absolute right-0 mt-2 bg-gray-800 text-white rounded-md shadow-lg w-40 z-50">
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
