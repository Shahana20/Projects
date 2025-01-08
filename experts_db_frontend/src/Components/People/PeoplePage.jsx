import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PeoplePage = () => {
  const [tab, setTab] = useState('mentors');  
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {

        const response = await axios.get('http://localhost:4000/api/v1/users');
        const allUsers = response.data.users;
        console.log(response);

        if (tab === 'mentors') {
          const mentors = allUsers.filter(user => user.user_role_id === 2);
          setUsers(mentors);
        } else if (tab === 'candidates') {
          const candidates = allUsers.filter(user => user.user_role_id === 3);
          setUsers(candidates);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [tab]);  

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">People Page</h1>

      <div className="flex space-x-4 mb-6">
        <button 
          onClick={() => setTab('mentors')} 
          className={`px-6 py-2 rounded-lg font-semibold ${tab === 'mentors' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}
        >
          Mentors
        </button>
        <button 
          onClick={() => setTab('candidates')} 
          className={`px-6 py-2 rounded-lg font-semibold ${tab === 'candidates' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}
        >
          Candidates
        </button>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          {tab === 'mentors' ? 'Mentors' : 'Candidates'}
        </h2>
        <div className="space-y-4">
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg">
                <div className="flex flex-col">
                  <Link to={`/users/${user.id}`} className="text-xl font-semibold text-blue-600 hover:text-blue-800">
                    {user.first_name} {user.last_name}
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No users found for this role.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PeoplePage;
