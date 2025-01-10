import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEO_API } from "../Utils/Constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import LodingResultVideos from "./LodingResultVideos";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const tempArray = [1, 2, 3, 4, 5, 6];

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_VIDEO_API);
    const jsonData = await data.json();
    setVideos(jsonData.items);
    // console.log(jsonData);
  };

  return (
    <div className="flex flex-wrap mt-12 justify-evenly">
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
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-[30%] cursor-pointer p-2 mx-0 sm:mx-2 my-2 h-auto">
                <LodingResultVideos></LodingResultVideos>
              </div>
            );
          })}
    </div>
  );
};

export default VideoContainer;
