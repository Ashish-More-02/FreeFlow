import { useState } from "react";

const ResultVideos = ({ info }) => {
  // const [overflow, setOverflow] = useState();

  if (!info) {
    return <div>Loading...</div>;
  }

  const { snippet = {}, statistics = {} } = info;
  const {
    channelTitle,
    title,
    thumbnails = {},
    publishedAt = "",
    description = "",
  } = snippet;

  function formatViews(views) {
    if (views >= 1_000_000) {
      return (views / 1_000_000).toFixed(1) + "M"; // Convert to millions
    } else if (views >= 1_000) {
      return (views / 1_000).toFixed(1) + "K"; // Convert to thousands
    } else {
      return views.toString(); // Keep as is if less than 1,000
    }
  }

  function calculate_time_uploaded(publishedAt) {
    const now = new Date();
    const videoDate = new Date(publishedAt);

    // Calculate the difference in milliseconds
    const diff = now - videoDate;

    // Convert the difference to meaningful units
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30); // Approximate months
    const years = Math.floor(days / 365); // Approximate years

    // Return the most relevant time unit
    if (years > 0) {
      return years + (years === 1 ? " year ago" : " years ago");
    } else if (months > 0) {
      return months + (months === 1 ? " month ago" : " months ago");
    } else if (days > 0) {
      return days + (days === 1 ? " day ago" : " days ago");
    } else if (hours > 0) {
      return hours + (hours === 1 ? " hour ago" : " hours ago");
    } else if (minutes > 0) {
      return minutes + (minutes === 1 ? " minute ago" : " minutes ago");
    } else {
      return seconds + (seconds === 1 ? " second ago" : " seconds ago");
    }
  }

  const viewsArray = ["1.2 M","1.22 k","213 k"]

  const OrigianlViews = "no views";

  const dateUploaded = calculate_time_uploaded(publishedAt) || "no time";

  const handleClickVideo = () => {};

  return (
    <div className="w-full bg-gray-200 p-4 rounded-xl flex flex-col md:flex-row dark:bg-[rgb(30,30,30)] dark:text-white">
      <div className="w-full sm:w-[40%] flex-shrink-0">
        <img
          className="rounded-lg w-full sm:w-[400px] h-[230px] sm:h-[250px] object-cover"
          alt="thumbnail"
          src={thumbnails?.medium?.url}
        />
      </div>
      <div className="flex mt-4 md:mt-0 md:ml-4 flex-grow">
        <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
          <img
            className="w-full h-full object-cover"
            alt="channel-icon"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&s"
          />
        </div>
        <div className="ml-2 flex-grow dark:text-gray-50">
          <h3 className="text-base font-semibold line-clamp-2">{title}</h3>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <span>{OrigianlViews} views</span>
            <span className="mx-1">•</span>
            <span>{dateUploaded}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1 dark:text-gray-50 font-semibold">
            {channelTitle+ " ☑️"}
          </p>
          <div className="text-gray-800 text-sm hidden sm:block dark:text-gray-400">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultVideos;
