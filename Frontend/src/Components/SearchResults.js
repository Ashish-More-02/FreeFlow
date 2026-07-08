import React, { useEffect, useState } from "react";
import { YOUTUBE_SEARCH_RESULTS_API } from "../Utils/Constants";
import { Link } from "react-router-dom";
import ResultVideos from "./ResultVideos";
import { useSelector } from "react-redux";
import LodingResultVideos from "./LodingResultVideos";

const SearchResults = () => {
  // null = still loading (shows skeletons); array = loaded results.
  const [videos, setVideos] = useState(null);
  const searchQuery = useSelector((store) => store.search.searchQuery);
  const tempArray = [1, 2, 3, 4, 5, 6];

  useEffect(() => {
    getVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const getVideos = async () => {
    try {
      const data = await fetch(YOUTUBE_SEARCH_RESULTS_API + searchQuery);
      const jsonData = await data.json();
      // The search API mixes videos, channels and playlists; keep only
      // items that actually have a videoId so the /watch links are valid.
      const items = Array.isArray(jsonData.items) ? jsonData.items : [];
      setVideos(items.filter((item) => item?.id?.videoId));
    } catch (error) {
      console.error("Error fetching search results:", error);
      setVideos([]);
    }
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
              <div
                key={i}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-[30%] cursor-pointer p-2 mx-0 sm:mx-2 my-2 h-auto"
              >
                <LodingResultVideos></LodingResultVideos>
              </div>
            );
          })}
    </div>
  );
};

export default SearchResults;
