import { DEFAULT_AVATAR } from "../Utils/Constants";
import { formatCount, timeAgo } from "../Utils/format";

const VideoCard = ({ info, channelIcon }) => {
  if (!info) return null;

  const { snippet = {}, statistics = {} } = info;
  const { channelTitle, title, thumbnails = {}, publishedAt = "" } = snippet;

  const thumbnail =
    thumbnails?.maxres?.url ||
    thumbnails?.high?.url ||
    thumbnails?.medium?.url ||
    thumbnails?.default?.url;

  const views = formatCount(statistics.viewCount);
  const uploaded = timeAgo(publishedAt);

  return (
    <div className="group w-full cursor-pointer">
      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-gray-200 dark:bg-[rgb(30,30,30)]">
        <img
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          alt="thumbnail"
          loading="lazy"
          src={thumbnail}
        />
      </div>

      {/* Meta row */}
      <div className="flex gap-3 mt-3">
        <img
          className="w-9 h-9 rounded-full object-cover flex-shrink-0 bg-gray-300 dark:bg-gray-700"
          alt="channel"
          loading="lazy"
          src={channelIcon || DEFAULT_AVATAR}
          onError={(e) => {
            e.currentTarget.src = DEFAULT_AVATAR;
          }}
        />
        <div className="min-w-0 flex-grow">
          <h3 className="text-sm font-semibold leading-snug line-clamp-2 text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mt-1 truncate hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
            {channelTitle}
          </p>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            <span>{views} views</span>
            {uploaded && (
              <>
                <span className="mx-1">•</span>
                <span>{uploaded}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
