import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { doToggleMenu } from "../Redux/Slices/appConfigSlice";
import logoImg from "../Images/logo.png";
import { YOUTUBE_SEARCH_API } from "../Utils/Constants";
import { Link } from "react-router-dom";

const Heading = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleToggleMenu = () => {
    dispatch(doToggleMenu());
  };

  useEffect(() => {
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
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    try {
      const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
      const jsonData = await data.json();
      setSuggestions(jsonData[1]);
    } catch (error) {
      console.error('Error fetching search suggestions:', error);
      setSuggestions([]);
    }
  };

  return (
    <div className="shadow-lg p-3 my-2 rounded-md w-full">
      <div className="grid grid-cols-12 items-center gap-3">
        <div className="col-span-3 md:col-span-3 lg:col-span-2 flex items-center gap-3">
          <img
            onClick={handleToggleMenu}
            className="h-6 w-6 md:h-7 md:w-7 cursor-pointer hover:bg-gray-100 p-1 rounded-full"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/800px-Hamburger_icon.svg.png"
            alt="menu"
          />
          <Link to="/" className="flex items-center">
            <img 
              className="h-7 md:h-9 lg:h-10 cursor-pointer" 
              src={logoImg} 
              alt="logo"
              onClick={() => window.location.href = '/'}
            />
            <h1 
              className="hidden md:block text-2xl lg:text-3xl font-bold ml-2 cursor-pointer"
              onClick={() => window.location.href = '/'}
            >
              FreeFlow
            </h1>
          </Link>
        </div>

        <div className="col-span-6 md:col-span-7 lg:col-span-9">
          <div className="relative max-w-2xl mx-auto">
            <input
              className="w-full bg-gray-100 rounded-full py-2 md:py-3 px-5 pr-14 text-base md:text-lg"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            <div className="absolute right-0 top-0 h-full flex items-center">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-2 md:p-3 hover:bg-gray-200 rounded-full"
                >
                  <span className="text-base md:text-lg text-gray-500">✕</span>
                </button>
              )}
              <button className="p-2 md:p-3 hover:bg-gray-200 rounded-full mr-1">
                <span className="text-base md:text-lg">🔍</span>
              </button>
            </div>
            
            {showSuggestions && searchQuery && (
              <div className="absolute mt-1 w-full bg-white rounded-lg shadow-lg z-50">
                <ul className="py-2">
                  {suggestions.map((s) => (
                    <li
                      key={s}
                      className="px-5 py-2.5 hover:bg-gray-100 cursor-pointer text-base md:text-lg flex items-center gap-3"
                      onClick={() => setSearchQuery(s)}
                    >
                      <span className="text-gray-400 text-lg md:text-xl">🔍</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="col-span-3 md:col-span-2 lg:col-span-1 flex justify-end">
          <Link to="/login" className="flex items-center gap-3">
            <img
              className="h-8 w-8 md:h-10 md:w-10 rounded-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&s"
              alt="User"
            />
            <span className="hidden md:block text-lg lg:text-xl">Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Heading;
