import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null); // Clear the user state
    navigate("/"); // Redirect to the login page ("/")
    window.location.reload();
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a className="text-white text-xl font-bold" href="/hello">Experts</a>
        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <div className="relative">
                <Link className="text-white hover:bg-gray-700 px-3 py-2 rounded-md" to="/people">People</Link>
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
              <Link className="text-white hover:bg-gray-700 px-3 py-2 rounded-md" to="/signup">Sign Up</Link>
              <Link className="text-white hover:bg-gray-700 px-3 py-2 rounded-md" to="/">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
