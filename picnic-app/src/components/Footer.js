import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#1E293B] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Section */}
        <nav className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <Link
            to="/"
            className="text-2xl md:text-3xl font-bold tracking-wide text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
          >
            The CMDians
          </Link>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[
              { to: '/policy', label: 'Policy' },
              { to: '/service', label: 'Service' },
              { to: '/help', label: 'Help' },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm md:text-base hover:text-cyan-300 transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            ))}
          </div>
        </nav>

        {/* Social Links Section */}
        <div className="flex flex-col items-center gap-6 mb-8">
          <p className="text-base md:text-lg font-medium">Connect with us:</p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=100051050715146&mibextid=ZbWKwL' },
              { name: 'Instagram', url: 'https://www.instagram.com/code.with.akki?igsh=bWowc3kwd2k4dnk5' },
              { name: 'Twitter', url: 'https://x.com/codewithakki20?t=tEa56onT-Zef09qOwrNBnw&s=09' },
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm md:text-base hover:text-cyan-300 transition-colors duration-300 relative group"
              >
                {social.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-600/40" />

        {/* Copyright Section */}
        <div className="text-center">
          <p className="text-sm md:text-base font-medium">
            © {new Date().getFullYear()} CodeWithAkki. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;