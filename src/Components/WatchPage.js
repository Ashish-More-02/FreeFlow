import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeMenu, doToggleMenu } from "../Redux/Slices/appConfigSlice";
import { useSearchParams } from "react-router-dom";
import CommentsContainer from "./CommentsContainer";

const WatchPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  // this searchParams have a 'get' function , which will give the url variables like v="adfad2341fds" or region="us"
  console.log(searchParams.get("v"));

  useEffect(() => {
    dispatch(closeMenu());
  }, []);

  return (
    <div className="p-4">
      <iframe className="rounded-2xl"
        width="900"
        height="480"
        src={"https://www.youtube.com/embed/"+searchParams.get("v")}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>

      <CommentsContainer></CommentsContainer>
    </div>
  );
};

export default WatchPage;
