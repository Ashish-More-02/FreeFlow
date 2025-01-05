import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Hamburger menu button - visible only on mobile */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className="w-6 h-0.5 bg-black mb-1"></div>
        <div className="w-6 h-0.5 bg-black mb-1"></div>
        <div className="w-6 h-0.5 bg-black"></div>
      </button>

      {/* Sidebar content */}
      <div className={`
        fixed lg:static top-0 left-0 h-full bg-white
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        transition-transform duration-300 ease-in-out
        lg:w-[12%] w-64 p-2 shadow-lg z-40
      `}>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>Shorts</li>
          <li>Subscribtions</li>
        </ul>

        <h1 className="font-bold text-lg mt-3">You </h1>
        <ul>
          <li>History</li>
          <li>Playlists</li>
          <li>Your Movies</li>
          <li>Your Videos</li>
          <li>Watch Later</li>
          <li>Live Movies</li>
        </ul>

        <h1 className="font-bold text-lg mt-3">Subscribtions</h1>
        <ul>
          <li>Harkarit singh</li>
          <li>code with harry</li>
          <li>TechBar</li>
          <li>minecraft</li>
          <li>akashay sani</li>
          <li>coding live</li>
        </ul>

        <h1 className="font-bold text-lg mt-3">Explore</h1>
        <ul>
          <li>Trending</li>
          <li>Shopping</li>
          <li>Music</li>
          <li>Movies</li>
          <li>live</li>
          <li>gamming</li>
          <li>News</li>
          <li>Podcasts</li>
        </ul>
      </div>

      {/* Overlay for mobile */}
      {isMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
