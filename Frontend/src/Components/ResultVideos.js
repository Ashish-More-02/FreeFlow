import { DEFAULT_AVATAR } from "../Utils/Constants";
import { timeAgo } from "../Utils/format";

const ResultVideos = ({ info, channelIcon }) => {
  if (!info) return null;

  const { snippet = {} } = info;
  const {
    channelTitle,
    title,
    thumbnails = {},
    publishedAt = "",
    description = "",
  } = snippet;

  const thumbnail =
    thumbnails?.high?.url || thumbnails?.medium?.url || thumbnails?.default?.url;
  const uploaded = timeAgo(publishedAt);

  return (
    <div className="group w-full flex flex-col sm:flex-row gap-4 rounded-xl p-2 hover:bg-gray-100 dark:hover:bg-white/[0.04] transition-colors">
      {/* Thumbnail */}
      <div className="w-full sm:w-[360px] flex-shrink-0 overflow-hidden rounded-xl aspect-video bg-gray-200 dark:bg-[rgb(30,30,30)]">
        <img
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          alt="thumbnail"
          loading="lazy"
          src={thumbnail}
        />
      </div>

      {/* Details */}
      <div className="flex-grow min-w-0">
        <h3 className="text-lg font-semibold leading-snug line-clamp-2 text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {uploaded}
        </p>

        <div className="flex items-center gap-2 mt-3">
          <img
            className="w-7 h-7 rounded-full object-cover bg-gray-300 dark:bg-gray-700"
            alt="channel"
            loading="lazy"
            src={channelIcon || DEFAULT_AVATAR}
            onError={(e) => {
              e.currentTarget.src = DEFAULT_AVATAR;
            }}
          />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {channelTitle}
          </span>
        </div>

        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 line-clamp-2 hidden sm:block">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResultVideos;
