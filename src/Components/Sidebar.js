import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="p-2 shadow-lg w-[12%]">
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
  );
};

export default Sidebar;
