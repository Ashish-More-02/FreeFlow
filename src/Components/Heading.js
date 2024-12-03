import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { doToggleMenu } from "../Redux/Slices/appConfigSlice";
import logoImg from "../Images/logo.png";
import { YOUTUBE_SEARCH_API } from "../Utils/Constants";

const Heading = () => {
  const dispatch = useDispatch();
  const [SearchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions , setShowSuggestions] = useState(false);

  // console.log(SearchQuery);

  const handleToggleMenu = () => {
    dispatch(doToggleMenu());
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getSearchSuggestions();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [SearchQuery]);

  const getSearchSuggestions = async () => {
    // console.log(SearchQuery);
    const data = await fetch(YOUTUBE_SEARCH_API + SearchQuery);
    const jsonData = await data.json();
    setSuggestions(jsonData[1]);
    // console.log(jsonData[1]);
  };

  return (
    <div className="shadow-lg p-2 my-2 rounded-md grid grid-flow-col w-full">
      <div className="flex items-center col-span-1">
        <img
          onClick={handleToggleMenu}
          className="h-6 mr-4 cursor-pointer"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/800px-Hamburger_icon.svg.png"
          alt="hamburger menu icon"
        ></img>
        <a href="/">
          <div className="flex justify-center items-center">
            <img className="h-9 cursor-pointer m-2" src={logoImg}></img>
            <h1 className="text-4xl font-bold"> FreeFlow </h1>
          </div>
        </a>
        {/* <img
            className="h-8 cursor-pointer"
            src="https://cdn.worldvectorlogo.com/logos/youtube-6.svg"
            alt="logo"
          ></img> */}
      </div>
      <div className="col-span-10 pl-20 ">
        <div className="">
          <input
            className="bg-gray-200 text-xl py-3 px-6 rounded-l-full w-[60%]"
            type="text"
            placeholder="Search"
            value={SearchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={()=>setShowSuggestions(true)}
            onBlur={()=>setShowSuggestions(false)}
          ></input>
          <button
            onClick={() => setSearchQuery("")}
            className="absolute top-5 right-[34%] hover:bg-gray-300 rounded-full p-3 px-5"
          >
            X
          </button>
          <button className="rounded-r-full bg-gray-400 py-3 px-6 text-xl">
            🔍
          </button>
        </div>
        {(showSuggestions && SearchQuery) &&(
          <div  className="absolute w-[34.5rem] bg-white rounded-xl z-10 px-5 py-3 shadow-xl">
            <ul>
              {suggestions.map((s) => (
                <li
                  className="py-2 px-2 hover:bg-gray-100 rounded-lg cursor-default"
                  key={s}
                  onClick={() => setSearchQuery(s)}
                >
                  🔍 {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div>
        <img
          className="h-12 cursor-pointer"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&s"
        ></img>
      </div>
    </div>
  );
};

export default Heading;
