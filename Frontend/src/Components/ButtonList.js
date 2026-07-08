import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { getSearchVideoResults } from "../Redux/Slices/SearchSlice";

const CATEGORIES = [
  "All",
  "Gaming",
  "Music",
  "Live",
  "Programming",
  "Minecraft",
  "Computer Hardware",
  "Smartphones",
  "Cooking",
  "Songs",
  "News",
  "Movies",
  "Podcasts",
];

const ButtonList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState("All");

  const handleClick = (name) => {
    setActive(name);
    if (name === "All") {
      navigate("/");
      return;
    }
    dispatch(getSearchVideoResults(name));
    navigate("/results");
  };

  return (
    <div className="flex items-center gap-3 w-full overflow-x-auto no-scrollbar px-4 py-3 dark:bg-black dark:text-white">
      {CATEGORIES.map((name) => (
        <Button
          key={name}
          name={name}
          active={active === name}
          onClick={() => handleClick(name)}
        />
      ))}
    </div>
  );
};

export default ButtonList;
