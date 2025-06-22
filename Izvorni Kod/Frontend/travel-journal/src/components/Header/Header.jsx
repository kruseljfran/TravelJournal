"use client"
import { Link } from "react-router-dom"
import "./Header.css"

const Header = ({ onSignOut }) => {
  return (
    <header className="w-full">
      <div className="max-w-7xl mx-auto">
        <nav className="flex justify-between items-center">
          {/* naslov */}
          <div className="text-xl font-bold">✈️ Putni dnevnik</div>

          {/* header links */}
          <div className="flex space-x-2 desktop-nav">
            <Link to="/home" className="px-4 py-2 text-gray-300 hover:bg-green-500 hover:text-white transition">
              🏠 Početna
            </Link>
            <Link to="/trips" className="px-4 py-2 text-gray-300 hover:bg-blue-500 hover:text-white transition">
              🗺️ Moja putovanja
            </Link>
            <Link to="/profile" className="px-4 py-2 text-gray-300 hover:bg-blue-500 hover:text-white transition">
              👤 Profil
            </Link>
          </div>

          {/* odjava */}
          <button onClick={onSignOut} className="sign-out-btn">
            🚪 Odjava
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
