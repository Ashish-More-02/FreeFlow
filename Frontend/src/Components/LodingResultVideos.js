import React from "react";

const LodingResultVideos = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-[320px] sm:w-[350px] md:w-[380px] lg:w-[400px] h-[280px] bg-gray-200 p-4 rounded-xl relative overflow-hidden animate-pulse">
        {/* Shimmer overlay */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        
        {/* Video thumbnail skeleton */}
        <div className="h-[200px] w-full bg-gray-300 rounded-lg"></div>
        
        {/* Channel info skeleton */}
        <div className="flex mt-2">
          <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-gray-300"></div>
          <div className="ml-2 flex-grow">
            <h3 className="h-4 bg-gray-300 rounded-lg w-3/4"></h3>
            <p className="h-3 bg-gray-300 rounded-lg w-1/2 mt-2"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LodingResultVideos;
