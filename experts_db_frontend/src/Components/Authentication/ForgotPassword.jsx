import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:4000/api/v1/passwords/forgot", {
        email,
      });
      setMessage(response.data.message);  
      setErrorMessage(''); 
    } catch (error) {
      setErrorMessage("An error occurred while sending reset instructions.");
      setMessage('');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-blue-500 flex justify-center items-center">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">Forgot Password</h3>
        <p className="text-gray-500 text-center mb-6">Enter your email to reset your password</p>

        <form onSubmit={handlePasswordReset} className="w-full">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your email"
            />
          </div>

          {message && <p className="text-green-500 text-center mb-4">{message}</p>}
          {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg mb-3 hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Instructions"}
          </button>
        </form>

        <div className="text-center">
          <p className="text-gray-600">
            Remember your password?{' '}
            <a href="/login" className="text-blue-500 font-bold hover:underline">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
