import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEO_API } from "../Utils/Constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_VIDEO_API);
    const jsonData = await data.json();
    setVideos(jsonData.items);
    console.log(jsonData);
  };

  return (
    <div className="flex flex-wrap mt-12">
      {/* {videos.map((oneVideo) => (
        <VideoCard key={oneVideo.id} info={oneVideo} />
      ))} */}

      {videos.map((video) => {
        return (
          <Link key={video.id} className="w-1/4 cursor-pointer p-2 mx-6 my-2 h-80" to={"/watch?v=" + video.id}>
            <VideoCard  info={video}></VideoCard>
          </Link>
        );
      })}
    </div>
  );
};

export default VideoContainer;
