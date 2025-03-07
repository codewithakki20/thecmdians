import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL from "../environment";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Both email and password are required");
      return;
    }

    setError("");
    dispatch(signInStart());

    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/auth/signin`,
        { email, password },
        { withCredentials: true }
      );

      if (res.data.success === false) {
        toast.error(res.data.message);
        dispatch(signInFailure(res.data.message));
        return;
      }

      toast.success(res.data.message);
      dispatch(signInSuccess(res.data));
      navigate("/");
    } catch (err) {
      toast.error(err.message);
      dispatch(signInFailure(err.message));
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-teal-500">
      <div className="bg-white text-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg font-semibold transition duration-300"
          >
            Sign In
          </button>
        </form>
        <div className="mt-4 text-center">
          Not registered yet?{" "}
          <Link to="/signup" className="text-teal-500 hover:underline font-medium">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
