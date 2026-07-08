import React, { useEffect, useState } from "react";
import { YOUTUBE_SEARCH_RESULTS_API } from "../Utils/Constants";
import { Link } from "react-router-dom";
import ResultVideos from "./ResultVideos";
import { useSelector } from "react-redux";
import LodingResultVideos from "./LodingResultVideos";
import { fetchChannelIcons } from "../Utils/youtube";

const SearchResults = () => {
  // null = still loading (shows skeletons); array = loaded results.
  const [videos, setVideos] = useState(null);
  const [channelIcons, setChannelIcons] = useState({});
  const searchQuery = useSelector((store) => store.search.searchQuery);
  const tempArray = [1, 2, 3, 4, 5];

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
      const onlyVideos = items.filter((item) => item?.id?.videoId);
      setVideos(onlyVideos);

      const icons = await fetchChannelIcons(
        onlyVideos.map((v) => v.snippet?.channelId)
      );
      setChannelIcons(icons);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setVideos([]);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] px-4 py-6 dark:bg-black">
      <div className="max-w-4xl">
        <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {searchQuery ? (
            <>
              Results for{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                “{searchQuery}”
              </span>
            </>
          ) : (
            "Search Results"
          )}
        </h1>

        <div className="flex flex-col gap-4">
          {videos
            ? videos.map((video) => (
                <Link key={video.id.videoId} to={"/watch?v=" + video.id.videoId}>
                  <ResultVideos
                    info={video}
                    channelIcon={channelIcons[video.snippet?.channelId]}
                  />
                </Link>
              ))
            : tempArray.map((i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-[360px] flex-shrink-0">
                    <LodingResultVideos />
                  </div>
                </div>
              ))}

          {videos && videos.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 text-center py-10">
              No results found. Try a different search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
