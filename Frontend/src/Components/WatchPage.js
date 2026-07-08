import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../Redux/Slices/appConfigSlice";
import { useSearchParams } from "react-router-dom";
import CommentsContainer from "./CommentsContainer";
import { DEFAULT_AVATAR, getVideoDetailsApi } from "../Utils/Constants";
import { fetchChannelIcons } from "../Utils/youtube";
import { formatCount, timeAgo } from "../Utils/format";

const WatchPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  const [video, setVideo] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);
  const [showFullDesc, setShowFullDesc] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(closeMenu());
    setShowFullDesc(false);

    const getVideoDetails = async () => {
      if (!videoId) return;
      try {
        const res = await fetch(getVideoDetailsApi(videoId));
        const json = await res.json();
        const item = Array.isArray(json.items) ? json.items[0] : null;
        setVideo(item || null);

        if (item?.snippet?.channelId) {
          const icons = await fetchChannelIcons([item.snippet.channelId]);
          setChannelIcon(icons[item.snippet.channelId] || null);
        }
      } catch (error) {
        console.error("Error fetching video details:", error);
        setVideo(null);
      }
    };
    getVideoDetails();
  }, [videoId, dispatch]);

  const snippet = video?.snippet || {};
  const statistics = video?.statistics || {};
  const description = snippet.description || "";

  return (
    <div className="w-full px-4 py-4 dark:bg-black dark:text-white">
      <div className="max-w-[1000px]">
        {/* Player */}
        <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-lg">
          <iframe
            className="w-full h-full"
            src={
              videoId
                ? "https://www.youtube.com/embed/" + videoId + "?autoplay=1&rel=0"
                : ""
            }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>

        {/* Title */}
        <h1 className="text-lg md:text-xl font-bold mt-4 leading-snug">
          {snippet.title || "Loading…"}
        </h1>

        {/* Channel + actions bar */}
        <div className="flex items-center justify-between flex-wrap gap-3 mt-3">
          <div className="flex items-center gap-3">
            <img
              className="w-10 h-10 rounded-full object-cover bg-gray-300 dark:bg-gray-700"
              alt="channel"
              src={channelIcon || DEFAULT_AVATAR}
              onError={(e) => {
                e.currentTarget.src = DEFAULT_AVATAR;
              }}
            />
            <div>
              <p className="font-semibold leading-tight">
                {snippet.channelTitle || ""}
              </p>
            </div>
            <button className="ml-2 px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black font-semibold text-sm hover:opacity-90">
              Subscribe
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="flex items-center gap-1 bg-gray-100 dark:bg-[rgb(40,40,40)] rounded-full px-4 py-2 font-medium">
              👍 {formatCount(statistics.likeCount)}
            </span>
            <span className="flex items-center gap-1 bg-gray-100 dark:bg-[rgb(40,40,40)] rounded-full px-4 py-2 font-medium">
              ↗ Share
            </span>
          </div>
        </div>

        {/* Description box */}
        <div className="mt-4 bg-gray-100 dark:bg-[rgb(30,30,30)] rounded-xl p-4 text-sm">
          <div className="font-semibold mb-1">
            {formatCount(statistics.viewCount)} views
            {snippet.publishedAt && (
              <>
                <span className="mx-1">•</span>
                {timeAgo(snippet.publishedAt)}
              </>
            )}
          </div>
          {description && (
            <>
              <p
                className={`whitespace-pre-line text-gray-700 dark:text-gray-300 ${
                  showFullDesc ? "" : "line-clamp-2"
                }`}
              >
                {description}
              </p>
              <button
                onClick={() => setShowFullDesc((v) => !v)}
                className="mt-1 font-semibold text-gray-600 dark:text-gray-400 hover:underline"
              >
                {showFullDesc ? "Show less" : "Show more"}
              </button>
            </>
          )}
        </div>

        <CommentsContainer />
      </div>
    </div>
  );
};

export default WatchPage;
