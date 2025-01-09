import React, { useEffect, useState } from "react";
import { YOUTUBE_SEARCH_RESULTS_API } from "../Utils/Constants";
import { Link } from "react-router-dom";
import ResultVideos from "./ResultVideos";
import { useSelector } from "react-redux";

const SearchResults = () => {
  const [videos, setVideos] = useState([]);
  const searchQuery = useSelector((store) => store.search.searchQuery);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_SEARCH_RESULTS_API + searchQuery);
    const jsonData = await data.json();
    setVideos(jsonData.items);
    console.log(jsonData);
  };

  return (
    <div className="flex flex-wrap mt-12 justify-evenly">
      {videos.map((video) => {
        return (
          <Link
            key={video.id.videoId}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-[30%] cursor-pointer p-2 mx-0 sm:mx-2 my-2 h-auto"
            to={"/watch?v=" + video.id.videoId}
          >
            <ResultVideos info={video}></ResultVideos>
          </Link>
        );
      })}
    </div>
  );
};

export default SearchResults;
