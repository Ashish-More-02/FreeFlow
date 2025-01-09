import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeMenu, doToggleMenu } from "../Redux/Slices/appConfigSlice";
import { useSearchParams } from "react-router-dom";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";

const WatchPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  // this searchParams have a 'get' function , which will give the url variables like v="adfad2341fds" or region="us"
  console.log(searchParams.get("v"));

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(closeMenu());
  }, []);

  return (
    <div className="p-4 w-full">
      <div className="flex w-full justify-evenly ">
        <iframe
          className="rounded-2xl mx-auto w-full aspect-video max-w-[900px]"
          src={"https://www.youtube.com/embed/" + searchParams.get("v")+"?autoplay=1"}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowFullScreen
          muted
        ></iframe>
        <div className="w-[34%] pr-5 hidden md:block">
          <LiveChat></LiveChat>
        </div>
      </div>

      <CommentsContainer></CommentsContainer>
    </div>
  );
};

export default WatchPage;
