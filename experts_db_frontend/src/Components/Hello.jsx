import { useEffect, useState } from "react";
const Hello = () => {
  const [user, setUser] = useState(null);
  
  console.log("user Data");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    console.log("inside hello.jsx",userData)
    
    if (userData) {
      setUser(userData);
    }
  }, []);

  return (
    <div>
      {user ? (
        <h1>Hi, {user.first_name}</h1> 
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Hello;
