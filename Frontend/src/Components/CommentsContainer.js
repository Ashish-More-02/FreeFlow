import React, { useEffect, useState } from "react";
import { YOUTUBE_COMMENTS_API } from "../Utils/Constants";
import { useSearchParams } from "react-router-dom";
import Comments from "./Comments";

const CommentsContainer = () => {
  const [TOPcomments, setTOPComments] = useState([]);

  // we are using this search params to get the videoID , it searches for the text "v"
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    const data = await fetch(
      YOUTUBE_COMMENTS_API +
        videoId +
        "&key=AIzaSyCnIGheBghd1RUSMtEb7KrflcrpUCoyNYA"
    );
    const jsonData = await data.json();
    setTOPComments(jsonData.items);

    // console.log(jsonData.items)
  };
  return (
    <div className="my-4">
      <h1 className="text-4xl font-semibold">Comments </h1>
      <div>
        {TOPcomments.map((item) => {
          return <Comments key={item.snippet?.topLevelComment?.id} item={item}></Comments>;
        })}
      </div>
    </div>
  );
};

export default CommentsContainer;
