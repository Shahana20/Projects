import { useEffect, useState } from 'react';

const Hello = () => {

  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
  console.log(token)

  useEffect(() => {
    fetch('/api/v1/users/current', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('User Data:', data);
        console.log('Decoded Token:', token);
        setUser(data); // Set user data to the state
      });
  }, [token]);

  return (
    <div>
      {user ? <h1>Hello, {user.first_name}</h1> : <p>Loading...</p>}
    </div>
  );
};

export default Hello;
