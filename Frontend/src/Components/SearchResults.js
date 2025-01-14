import React, { useEffect, useState } from "react";
import { YOUTUBE_SEARCH_RESULTS_API } from "../Utils/Constants";
import { Link } from "react-router-dom";
import ResultVideos from "./ResultVideos";
import { useSelector } from "react-redux";
import LodingResultVideos from "./LodingResultVideos";

const SearchResults = () => {
  const [videos, setVideos] = useState([]);
  const searchQuery = useSelector((store) => store.search.searchQuery);
  const tempArray = [1, 2, 3, 4, 5, 6];

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
      <h1 className="w-[90%] sm:w-[88%] dark:text-white text-2xl mx-auto">Search Results</h1>
      {videos
        ? videos.map((video) => {
            return (
              <Link
                key={video.id.videoId}
                className="w-full sm:w-full lg:w-[90%] cursor-pointer p-2 mx-0 sm:mx-2 my-2 h-auto"
                to={"/watch?v=" + video.id.videoId}
              >
                <ResultVideos info={video}></ResultVideos>
              </Link>
            );
          })
        : tempArray.map((i) => {
            return (
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-[30%] cursor-pointer p-2 mx-0 sm:mx-2 my-2 h-auto">
                <LodingResultVideos></LodingResultVideos>
              </div>
            );
          })}
    </div>
  );
};

export default SearchResults;
