import React from "react";
import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";

const MainContainer = () => {
  return (
    <div className="w-full min-w-0 flex flex-col min-h-[calc(100vh-4rem)] dark:bg-[#07070f]">
      <ButtonList />
      <VideoContainer />
    </div>
  );
};

export default MainContainer;
