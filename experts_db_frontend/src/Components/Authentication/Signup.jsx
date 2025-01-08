import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const [passwordStrength, setPasswordStrength] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate(); 

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });

    if (errorMessage) {
      setErrorMessage('');
    }
  };


  const checkPasswordStrength = (password) => {
    if (password.length < 6) {
      setPasswordStrength('Weak');
    } else if (password.length >= 6 && password.length < 12) {
      setPasswordStrength('Moderate');
    } else {
      setPasswordStrength('Strong');
    }
  };

 
  const handlePasswordChange = (e) => {
    handleChange(e);
    checkPasswordStrength(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    

    if (!userData.first_name || !userData.last_name || !userData.email || !userData.password || !userData.password_confirmation) {
      setErrorMessage('All fields are required.');
      return;
    }

    
    if (userData.password !== userData.password_confirmation) {
      setErrorMessage("Passwords do not match!");
      return;
    }

   
    setIsSubmitting(true);

    try {
   
      const response = await axios.post('http://localhost:4000/api/v1/users', { user: userData });
      console.log(response.data);
      setErrorMessage(''); 
      const { user, token } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);  // Store the JWT token

      // // Navigate to the next page
      // navigate('/hello', { state: { userData: response.data } });
      // const { user } = response.data;
      // localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate('/dashboard' , {state: {userData: response.data}}); 
    } 
    catch (error) {
  
      setErrorMessage(
        error.response && error.response.data && Array.isArray(error.response.data.errors)
          ? error.response.data.errors.join(', ')
          : 'An error occurred'
      );
    } finally {
    
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-500">
      <div className="bg-white rounded-3xl shadow-xl p-4 w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <img
            className="rounded-full w-16 h-16"
            src="https://via.placeholder.com/50"
            alt="Profile"
          />
        </div>
        <h3 className="text-2xl font-semibold text-center text-gray-800">Experts</h3>
        <h4 className="text-xl font-semibold text-center text-gray-800 mb-4">Sign Up</h4>
        <p className="text-gray-500 text-center mb-6">Please enter your details to create an account!</p>

        {errorMessage && (
          <div className="bg-red-500 text-white p-3 mb-4 text-center rounded-md">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="first_name" className="block text-gray-800">First Name</label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              value={userData.first_name}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="w-full p-3 border rounded-md text-gray-700 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="last_name" className="block text-gray-800">Last Name</label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              value={userData.last_name}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="w-full p-3 border rounded-md text-gray-700 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-800">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full p-3 border rounded-md text-gray-700 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-800">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={userData.password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              className="w-full p-3 border rounded-md text-gray-700 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* Optionally, display password strength */}
            {/* <p className="mt-2 text-gray-600">Password Strength: {passwordStrength}</p> */}
          </div>

          <div className="mb-4">
            <label htmlFor="password_confirmation" className="block text-gray-800">Confirm Password</label>
            <input
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              value={userData.password_confirmation}
              onChange={handleChange}
              placeholder="Enter your password (again)"
              className="w-full p-3 border rounded-md text-gray-700 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting} // Disable button while submitting
            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            {isSubmitting ? 'Submitting...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-500">Already have an account? <a href="/" className="text-blue-600 font-semibold">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
