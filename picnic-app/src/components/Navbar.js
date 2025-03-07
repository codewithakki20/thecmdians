import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isAuthenticated = false; // Replace with actual authentication logic

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close menu on Escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const getLinkClassName = (path) => {
    return location.pathname === path
      ? "text-cyan-400 font-semibold border-b-2 border-cyan-400"
      : "text-gray-300 hover:text-cyan-400 transition-colors duration-300";
  };

  const navLinks = ["/", "/gallery","/events", "/registered", "/about", "/register", "/upload", "/signup",];

  return (
    <header className="bg-[#1E293B] text-white py-5 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        <Link to="/" className="text-3xl font-bold tracking-wide text-cyan-400">
          The CMDians
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((path) => (
            <Link
              key={path}
              to={path}
              className={`${getLinkClassName(path)} relative py-2 px-3 group uppercase font-semibold`}
            >
              {path.replace("/", "") || "Home"}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
          ))}
          {isAuthenticated && (
            <button className="text-gray-300 hover:text-red-400 transition-colors duration-300 font-semibold uppercase">Sign Out</button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300"
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
        >
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="text-xl" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        id="overlay"
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={(e) => e.target.id === "overlay" && setIsOpen(false)}
      >
        <div
          className={`fixed top-0 right-0 w-72 h-full bg-[#1E293B] bg-opacity-90 backdrop-blur-md p-6 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-bold text-cyan-400">Menu</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300"
              aria-label="Close Menu"
            >
              <FontAwesomeIcon icon={faTimes} className="text-xl" />
            </button>
          </div>
          <nav className="flex flex-col space-y-4">
            {navLinks.map((path) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className={`${getLinkClassName(path)} py-3 px-4 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all duration-300 uppercase`}
              >
                {path.replace("/", "") || "Home"}
              </Link>
            ))}
            {isAuthenticated && (
              <button
                className="py-3 px-4 rounded-lg text-gray-300 hover:text-red-400 hover:bg-white hover:bg-opacity-20 transition-all duration-300 uppercase"
              >
                Sign Out
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;