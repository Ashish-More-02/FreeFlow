import React from "react";
import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";

const MainContainer = () => {
  return (
    <div className="w-full flex flex-col relative">
      <ButtonList></ButtonList>
      <VideoContainer></VideoContainer>
    </div>
  );
};

export default MainContainer;
