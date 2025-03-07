import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-teal-500 text-white flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center space-y-6">
        {/* 404 Heading */}
        <h1 className="text-6xl md:text-8xl font-extrabold text-white drop-shadow-lg">
          404
        </h1>
        
        {/* Error Message */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Page Not Found
          </h2>
          <p className="text-gray-100 text-lg">
            Oops! It seems we've wandered off the path. The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Back Home Button */}
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-teal-400 text-blue-900 font-medium rounded-lg hover:bg-teal-300 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
        >
          Return to Home
        </Link>

        {/* Decorative Element */}
        <div className="mt-8 text-gray-200 text-sm">
          <p>
            Need help? Contact us at{" "}
            <a
              href="mailto:support@codewithakki.com"
              className="text-teal-200 hover:text-teal-100"
            >
              support@codewithakki.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
