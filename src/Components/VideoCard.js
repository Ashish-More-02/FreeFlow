import { useState } from "react";

const VideoCard = ({ info }) => {
  // const [overflow, setOverflow] = useState();

  if (!info) {
    return <div>Loading...</div>;
  }

  const { snippet = {}, statistics = {} } = info;
  const { channelTitle, title, thumbnails = {}, publishedAt = "" } = snippet;

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

  const OrigianlViews = formatViews(statistics.viewCount);

  const dateUploaded = calculate_time_uploaded(publishedAt);

  const handleClickVideo = () => {};

  return (
    <div
      className="h-full p-3 rounded-xl shadow-xl cursor-pointer bg-gray-100 "
      onClick={handleClickVideo}
    >
      {thumbnails.medium && (
        <img
          className="rounded-2xl"
          src={thumbnails.medium.url}
          alt="thumbnail"
        />
      )}
      <div>
        <div className="flex mt-2">
          <img
            className="h-8 mr-1"
            alt="channel logo"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&s"
          ></img>
          <h1 className="font-semibold h-12 overflow-hidden">
            {title + "..." || "No Title"}
          </h1>
        </div>
        <h2 className="pl-8">{channelTitle || "No Channel Title"}</h2>
        <div className="flex overflow-hidden pl-2 justify-evenly ">
          <p>{OrigianlViews + " Views" || "No Views"}</p>
          <p>·</p>
          <p>{dateUploaded || "No Date"}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
