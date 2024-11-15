import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
const Hello = () => {
  const [user, setUser] = useState(null);
  // const location = useLocation();
  // const {userData} = location.state || "not fetched";
  console.log("user Data");
  // console.log(userData);
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
