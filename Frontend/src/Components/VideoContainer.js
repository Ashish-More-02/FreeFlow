import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEO_API } from "../Utils/Constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import LodingResultVideos from "./LodingResultVideos";

const VideoContainer = () => {
  // null = still loading (shows skeletons); array = loaded results.
  const [videos, setVideos] = useState(null);
  const tempArray = [1, 2, 3, 4, 5, 6];

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    try {
      const data = await fetch(YOUTUBE_VIDEO_API);
      const jsonData = await data.json();
      setVideos(Array.isArray(jsonData.items) ? jsonData.items : []);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setVideos([]);
    }
  };

  return (
    <div className="flex flex-wrap mt-12 justify-evenly  dark:bg-black dark:text-white">
      {videos
        ? videos.map((video) => {
            return (
              <Link
                key={video.id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-[30%] cursor-pointer p-2 mx-0 sm:mx-2 my-2 h-auto"
                to={"/watch?v=" + video.id}
              >
                <VideoCard info={video}></VideoCard>
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

export default VideoContainer;
