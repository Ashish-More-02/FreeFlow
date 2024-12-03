const VideoCard = ({ info }) => {
  //   console.log(info);

  if (!info) {
    return <div>Loading...</div>;
  }

  const { snippet = {}, statistics = {} } = info;
  const { channelTitle, title, thumbnails = {}, publishedAt } = snippet;

  const handleClickVideo = () => {
    
  };

  return (
    <div
      className="h-full p-3 rounded-lg shadow-xl cursor-pointer"
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
        <h1 className="font-semibold">{title || "No Title"}</h1>
        <h2>{channelTitle || "No Channel Title"}</h2>
        <div className="flex overflow-hidden">
          <p>{statistics.viewCount + " Views" || "No Views"}</p>
          {/* <p>{publishedAt || "No Date"}</p> */}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
