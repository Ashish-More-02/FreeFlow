import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { doToggleMenu } from "../Redux/Slices/appConfigSlice";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.toggleMenu);
  const dispatch = useDispatch();

  return (
    <div className="relative z-10 bg-white">
      {/* Sidebar content */}
      <div className="px-4 fixed left-0 top-16 h-full bg-[rgb(255,255,255)] sm:static">
        <ul>
          <li className="font-semibold">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="font-semibold">Shorts</li>
          <li className="font-semibold">Subscriptions</li>
        </ul>

        <h1 className="font-bold text-lg mt-3">You</h1>
        <ul>
          <li className="m-1 font-semibold">History</li>
          <li className="m-1 font-semibold">Playlists</li>
          <li className="m-1 font-semibold">Your Movies</li>
          <li className="m-1 font-semibold">Your Videos</li>
          <li className="m-1 font-semibold">Watch Later</li>
          <li className="m-1 font-semibold">Live Movies</li>
        </ul>

        <h1 className="font-bold text-lg mt-3">Subscriptions</h1>
        <ul className="flex flex-col w-full">
          <li className="m-1 font-semibold">Harsharit Singh</li>
          <li className="m-1 font-semibold">Code with Harry</li>
          <li className="m-1 font-semibold">TechBar</li>
          <li className="m-1 font-semibold">Minecraft</li>
          <li className="m-1 font-semibold">Akshay Saini</li>
          <li className="m-1 font-semibold">Coding Live</li>
        </ul>

        <h1 className="font-bold text-lg mt-3">Explore</h1>
        <ul>
          <li className="m-1 font-semibold">Trending</li>
          <li className="m-1 font-semibold">Shopping</li>
          <li className="m-1 font-semibold">Music</li>
          <li className="m-1 font-semibold">Movies</li>
          <li className="m-1 font-semibold">Live</li>
          <li className="m-1 font-semibold">Gaming</li>
          <li className="m-1 font-semibold">News</li>
          <li className="m-1 font-semibold">Podcasts</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
