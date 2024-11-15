import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:4000/api/v1/users/sign_in", {
        user: { email, password },
      });
      console.log("Logged in:", response.data.user);

      // Redirect to another page or update state
      // For example:
      const { user } = response.data;
      localStorage.setItem("user", JSON.stringify(response.data.user));
      console.log(user)
      window.location.href = "/hello";

    } catch (error) {
      setErrorMessage("Invalid email or password");
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-blue-500 flex justify-center items-center">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">Login</h3>
        <p className="text-gray-500 text-center mb-6">Please enter your login credentials</p>

        <form onSubmit={handleLogin} className="w-full">
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
              placeholder="Email"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Password"
            />
          </div>

          {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg mb-3 hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
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
}

export default Login;
