import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  MdHome,
  MdWhatshot,
  MdSettings,
  MdMusicNote,
  MdSportsEsports,
  MdMovie,
  MdLiveTv,
  MdNewspaper,
  MdSportsSoccer,
  MdRestaurant,
  MdSchool,
  MdCategory,
} from "react-icons/md";
import { YOUTUBE_CATEGORIES_API } from "../Utils/Constants";
import useScreenSize from "../Utils/useScreenSize";
import { closeMenu } from "../Redux/Slices/appConfigSlice";
import { getSearchVideoResults } from "../Redux/Slices/SearchSlice";

// Fallback used if the YouTube categories API is unavailable (quota/key).
const FALLBACK_CATEGORIES = [
  "Music",
  "Gaming",
  "Movies",
  "Live",
  "News",
  "Sports",
  "Cooking",
  "Education",
];

// Map a category title to a sensible icon; falls back to a generic one.
const iconForCategory = (title = "") => {
  const t = title.toLowerCase();
  if (t.includes("music")) return <MdMusicNote />;
  if (t.includes("gaming") || t.includes("game")) return <MdSportsEsports />;
  if (t.includes("film") || t.includes("movie")) return <MdMovie />;
  if (t.includes("live")) return <MdLiveTv />;
  if (t.includes("news") || t.includes("politic")) return <MdNewspaper />;
  if (t.includes("sport")) return <MdSportsSoccer />;
  if (t.includes("cook") || t.includes("food")) return <MdRestaurant />;
  if (t.includes("education") || t.includes("learn")) return <MdSchool />;
  return <MdCategory />;
};

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const screenSize = useScreenSize();
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(YOUTUBE_CATEGORIES_API);
        const json = await res.json();
        const titles = Array.isArray(json.items)
          ? json.items
              .filter((item) => item?.snippet?.assignable)
              .map((item) => item.snippet.title)
          : [];
        if (titles.length) setCategories(titles);
      } catch (error) {
        console.error("Error fetching YouTube categories:", error);
        // keep the fallback list
      }
    };
    getCategories();
  }, []);

  // Close the drawer on mobile after any navigation.
  const closeOnMobile = () => {
    if (screenSize.width < 640) dispatch(closeMenu());
  };

  // Run a real YouTube search for a category and show the results page.
  const searchCategory = (term) => {
    dispatch(getSearchVideoResults(term));
    closeOnMobile();
    navigate("/results");
  };

  const linkClass =
    "flex items-center gap-3 px-3 py-2 rounded-lg font-semibold cursor-pointer hover:bg-gray-200 dark:hover:bg-[rgb(55,55,55)] w-full text-left";

  return (
    <div className="relative z-10 bg-white dark:bg-[rgb(30,30,30)] dark:text-white">
      <div className="px-2 py-2 fixed left-0 top-16 h-full w-56 overflow-y-auto bg-white dark:bg-[rgb(30,30,30)] sm:static sm:h-auto sm:w-52">
        {/* Primary navigation */}
        <ul className="border-b border-gray-200 dark:border-gray-700 pb-2">
          <li>
            <Link to="/" className={linkClass} onClick={closeOnMobile}>
              <MdHome className="text-xl" /> Home
            </Link>
          </li>
          <li>
            <Link to="/" className={linkClass} onClick={closeOnMobile}>
              <MdWhatshot className="text-xl" /> Trending
            </Link>
          </li>
          <li>
            <Link to="/settings" className={linkClass} onClick={closeOnMobile}>
              <MdSettings className="text-xl" /> Settings
            </Link>
          </li>
        </ul>

        {/* Real, clickable YouTube categories */}
        <h1 className="font-bold text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 mt-4 mb-1 px-3">
          Explore
        </h1>
        <ul>
          {categories.map((title) => (
            <li key={title}>
              <button
                type="button"
                className={linkClass}
                onClick={() => searchCategory(title)}
              >
                <span className="text-xl">{iconForCategory(title)}</span>
                <span className="truncate">{title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
