import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add signup logic here (e.g., API call)
    console.log({ name, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-teal-500">
      <div className="bg-white text-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
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
          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg font-semibold transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          Already have an account?{' '}
          <Link to="/signin" className="text-teal-500 hover:underline font-medium">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
