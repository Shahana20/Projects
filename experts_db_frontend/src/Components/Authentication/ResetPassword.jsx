import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [countdown, setCountdown] = useState(3); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.patch("http://localhost:4000/api/v1/passwords/reset", {
        token,
        password,
        password_confirmation: confirmPassword,
      });
      setMessage(response.data.message);
      setErrorMessage('');
      setShowSuccessDialog(true);
      
      let timer = 3;
      const interval = setInterval(() => {
        setCountdown(timer);
        timer -= 1;
        if (timer < 0) {
          clearInterval(interval);
          navigate("/"); 
        }
      }, 1000);
    } catch (error) {
      setErrorMessage("An error occurred while resetting your password.");
      setMessage('');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-blue-500 flex justify-center items-center">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">Reset Password</h3>
        <p className="text-gray-500 text-center mb-6">Enter your new password below</p>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">New Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your new password"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Confirm your new password"
            />
          </div>

          {message && <p className="text-green-500 text-center mb-4">{message}</p>}
          {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg mb-3 hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div className="text-center">
          <p className="text-gray-600">
            Remembered your password?{' '}
            <a href="/" className="text-blue-500 font-bold hover:underline">Login</a>
          </p>
        </div>

        {showSuccessDialog && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <h4 className="text-lg font-semibold text-center text-green-500 mb-4">Success!</h4>
              <p className="text-center text-gray-600">Your password has been reset successfully. You will be redirected to the login page in <span className="font-bold text-blue-500">{countdown}</span> seconds.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
