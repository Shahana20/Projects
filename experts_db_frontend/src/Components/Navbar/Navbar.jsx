import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  

  useEffect(() => {
    fetch('/api/v1/users/current', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch(error => console.error('Error fetching user:', error));
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a className="text-white text-xl font-bold" href="/hello">Experts</a>
        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <Link className="text-white hover:bg-gray-700 px-3 py-2 rounded-md" to="/people">People</Link>
              <Link className="text-white hover:bg-gray-700 px-3 py-2 rounded-md" to="/batches">Batches</Link>
              <div className="relative">
                <button
                  className="bg-gray-700 text-white px-3 py-2 rounded-md"
                  onClick={toggleDropdown}
                >
                  {user.first_name}
                </button>
                {isOpen && (
                  <div className="absolute right-0 mt-2 bg-gray-800 text-white rounded-md shadow-lg w-40">
                    <Link
                      to={`/profile/${user.username}`}
                      className="block px-4 py-2 text-sm hover:bg-gray-700"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/logout"
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
