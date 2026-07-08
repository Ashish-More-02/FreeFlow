import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  closeMenu,
  doToggleMenu,
  openMenu,
  toggleDarkMode,
} from "../Redux/Slices/appConfigSlice";
import logoImg from "../Images/logo.png";
import { YOUTUBE_SEARCH_API } from "../Utils/Constants";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useScreenSize from "../Utils/useScreenSize";
import { getSearchVideoResults } from "../Redux/Slices/SearchSlice";
import { IoMenu } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const Heading = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const darkmode = useSelector((state) => state.appconfigslice.darkMode);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  // index of the suggestion highlighted via arrow keys (-1 = none)
  const [activeIndex, setActiveIndex] = useState(-1);
  const screenSize = useScreenSize();

  const handleToggleMenu = () => {
    dispatch(doToggleMenu());
  };

  const handleOpenMenu = () => {
    dispatch(openMenu());
  };

  const handleCloseMenu = () => {
    dispatch(closeMenu());
  };

  useEffect(() => {
    // any new keystroke resets the arrow-key highlight
    setActiveIndex(-1);

    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      getSearchSuggestions();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    try {
      const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
      const jsonData = await data.json();
      // Google suggest returns [query, [suggestions], ...]; on error the
      // backend returns an object, so guard against a missing array.
      setSuggestions(Array.isArray(jsonData?.[1]) ? jsonData[1] : []);
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
      setSuggestions([]);
    }
  };

  // Runs the actual search: updates the box, stores the query in redux,
  // navigates to the results page and closes the suggestion dropdown.
  const runSearch = (queryArg) => {
    const finalQuery = (queryArg ?? searchQuery).trim();
    if (!finalQuery) return;

    setSearchQuery(finalQuery);
    dispatch(getSearchVideoResults(finalQuery));
    setShowSuggestions(false);
    setActiveIndex(-1);
    navigate("/results");
  };

  const handleKeyDown = (e) => {
    const hasSuggestions = showSuggestions && suggestions.length > 0;

    if (e.key === "ArrowDown" && hasSuggestions) {
      e.preventDefault();
      // last suggestion -> text box (-1) -> first suggestion
      setActiveIndex((prev) =>
        prev >= suggestions.length - 1 ? -1 : prev + 1
      );
    } else if (e.key === "ArrowUp" && hasSuggestions) {
      e.preventDefault();
      // text box (-1) -> last suggestion; first suggestion (0) -> text box (-1)
      setActiveIndex((prev) =>
        prev <= -1 ? suggestions.length - 1 : prev - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      // if a suggestion is highlighted, search for it; otherwise use the typed text
      const chosen =
        hasSuggestions && activeIndex >= 0
          ? suggestions[activeIndex]
          : searchQuery;
      runSearch(chosen);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setActiveIndex(-1);
    }
  };

  // What the input actually displays: the highlighted suggestion while the user
  // arrows through the list, otherwise the text they originally typed. Note that
  // `searchQuery` (the typed text) is never overwritten during navigation, so
  // moving back to the text box restores it.
  const inputValue =
    activeIndex >= 0 && suggestions[activeIndex] != null
      ? suggestions[activeIndex]
      : searchQuery;

  return (
    <div className="shadow-lg p-3 my-0 rounded-md w-full bg-gray-200 sticky z-10 top-0 sm:static sm:z-0 dark:bg-[rgb(30,30,30)] dark:text-white dark:my-0">
      <div className="flex items-center gap-2 sm:gap-4 w-full">
        {/* Left: menu button + logo (fixed width, never shrinks) */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <IoMenu
            onClick={handleToggleMenu}
            className="h-9 w-9 p-1.5 shrink-0 cursor-pointer rounded-full hover:bg-gray-300 dark:hover:bg-[rgb(69,69,69)]"
          />
          <Link
            to="/"
            className="flex items-center shrink-0"
            onClick={() =>
              screenSize.width < 640 ? handleCloseMenu() : handleOpenMenu()
            }
          >
            <img
              className="h-8 md:h-9 lg:h-10 w-auto shrink-0 cursor-pointer"
              src={logoImg}
              alt="logo"
            />
            <h1 className="hidden md:block text-2xl lg:text-3xl font-bold ml-2 cursor-pointer">
              FreeFlow
            </h1>
          </Link>
        </div>

        {/* Middle: search bar fills the remaining space */}
        <div className="flex-1 min-w-0 dark:bg-inherit dark:text-white">
          <div className="relative max-w-2xl mx-auto">
            <input
              className="w-full bg-gray-100 rounded-full py-2 md:py-3 px-5 pr-14 text-base md:text-lg dark:bg-[rgb(50,50,50)] dark:text-inherit"
              type="text"
              placeholder="Search"
              value={inputValue}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() =>
                // delay so a suggestion click (onMouseDown) is handled first;
                // resetting activeIndex restores the user's typed text
                setTimeout(() => {
                  setShowSuggestions(false);
                  setActiveIndex(-1);
                }, 200)
              }
            />
            <div className="absolute right-0 top-0 h-full flex items-center">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-2 md:p-3 hover:bg-gray-200 rounded-full dark:hover:bg-[rgb(80,80,80)]"
                >
                  <IoClose className="sm:text-xl"/>
                </button>
              )}
              <button
                type="button"
                className="p-2 md:p-3 hover:bg-gray-200 rounded-full mr-1 dark:hover:bg-[rgb(80,80,80)]"
                onClick={() => runSearch(inputValue)}
              >
                <IoSearch className="sm:text-lg"/>
              </button>
            </div>

            {showSuggestions && searchQuery && (
              <div className="absolute mt-1 w-full left-0 bg-white rounded-lg shadow-lg z-50 dark:bg-[rgb(30,30,30)] dark:text-white">
                <ul className="py-2">
                  {suggestions.map((s, index) => (
                    <li
                      key={s}
                      className={`px-5 py-2.5 cursor-pointer text-base md:text-lg flex items-center gap-3 ${
                        index === activeIndex
                          ? "bg-gray-100 dark:bg-[rgb(80,80,80)]"
                          : "hover:bg-gray-100 dark:hover:bg-[rgb(80,80,80)]"
                      }`}
                      onMouseEnter={() => setActiveIndex(index)}
                      // onMouseDown fires before the input's onBlur, so the
                      // dropdown is still mounted when the click is handled
                      onMouseDown={() => runSearch(s)}
                    >
                      <IoSearch />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right: theme toggle + account (fixed width, never shrinks) */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <button
            onClick={() => dispatch(toggleDarkMode())}
            className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-[rgb(80,80,80)] transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkmode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            )}
          </button>
          <Link
            to={isAuthenticated ? "/settings" : "/login"}
            className="flex items-center gap-2 sm:gap-3"
          >
            <img
              className="h-8 w-8 md:h-10 md:w-10 rounded-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&s"
              alt="User"
            />
            {isAuthenticated && user ? (
              <span className="hidden md:block text-lg whitespace-nowrap ">
                {user.name}
              </span>
            ) : (
              <span className="hidden md:block text-lg lg:text-xl">Login</span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Heading;
