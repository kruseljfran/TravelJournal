import React from "react";
import { Link } from "react-router-dom";
import './Header.css'; // Import Link for navigation

const Header = ({onSignOut}) => {
  return (
    <header className="w-full bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <nav className="flex justify-between items-center">
          {/* Title */}
          <div className="text-xl font-bold">Travel Journal</div>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            <Link to="/home" className="px-4 py-2 text-gray-300 hover:bg-green-500 hover:text-white transition">
              Home
            </Link>
            <Link to="/profile" className="px-4 py-2 text-gray-300 hover:bg-blue-500 hover:text-white transition">
              Profile
            </Link>
          </div>
          {/* Sign Out Button */}
          <button
            onClick={onSignOut}
            className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700 transition"
          >
            Sign Out
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
