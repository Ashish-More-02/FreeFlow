import React from "react";

const LodingResultVideos = () => {
  return (
    <div className="w-full animate-pulse">
      {/* Video thumbnail skeleton */}
      <div className="w-full aspect-video bg-gray-300 dark:bg-gray-700 rounded-xl"></div>

      {/* Channel info skeleton */}
      <div className="flex mt-3 gap-3">
        <div className="w-9 h-9 rounded-full flex-shrink-0 bg-gray-300 dark:bg-gray-700"></div>
        <div className="flex-grow">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-11/12"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mt-2"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default LodingResultVideos;
