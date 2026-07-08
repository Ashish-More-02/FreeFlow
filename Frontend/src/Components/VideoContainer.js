import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEO_API } from "../Utils/Constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import LodingResultVideos from "./LodingResultVideos";
import { fetchChannelIcons } from "../Utils/youtube";

const VideoContainer = () => {
  // null = still loading (shows skeletons); array = loaded results.
  const [videos, setVideos] = useState(null);
  const [channelIcons, setChannelIcons] = useState({});
  const tempArray = [1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    try {
      const data = await fetch(YOUTUBE_VIDEO_API);
      const jsonData = await data.json();
      const items = Array.isArray(jsonData.items) ? jsonData.items : [];
      setVideos(items);

      // Load the real channel avatars for the visible videos.
      const icons = await fetchChannelIcons(
        items.map((v) => v.snippet?.channelId)
      );
      setChannelIcons(icons);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setVideos([]);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 min-[1501px]:grid-cols-4 gap-x-4 gap-y-8 px-4 pt-4 dark:bg-[#07070f] dark:text-white">
      {videos
        ? videos.map((video) => (
            <Link
              key={video.id}
              className="w-full"
              to={"/watch?v=" + video.id}
            >
              <VideoCard
                info={video}
                channelIcon={channelIcons[video.snippet?.channelId]}
              />
            </Link>
          ))
        : tempArray.map((i) => <LodingResultVideos key={i} />)}
    </div>
  );
};

export default VideoContainer;
