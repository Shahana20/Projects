import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/v1/login', formData);
      console.log(response.data);  

      localStorage.setItem('token', response.data.token);  

      window.location.href = '/dashboard';  
    } catch (error) {
      console.error(error.response.data);
      alert('Login failed! Please check your credentials.');
    }
  };

  return (
    <div className="h-screen bg-blue-700 flex justify-center items-center">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">Login</h3>
        <p className="text-gray-500 text-center mb-6">Please enter your login credentials!</p>

        <form onSubmit={handleLogin} className="w-full">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Email"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg mb-3 hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="flex justify-end mb-4">
          <a href="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</a>
        </div>

        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-500 font-bold hover:underline">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
