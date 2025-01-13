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
    <div className="my-4 bg-gray-200 p-4 w-full md:max-w-[66%] dark:bg-black dark:text-white">
      <h1 className="text-4xl font-semibold my-2">Comments </h1>
      <form className="flex items-center mb-6">
        <input type="text" placeholder="add comment" className="w-full p-2 border border-gray-300 rounded-md dark:bg-[rgb(30,30,30)] dark:border-black" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md px-2 w-[10%] mx-4">Add</button>
      </form>
      <div>
        {TOPcomments.map((item) => {
          return <Comments key={item.snippet?.topLevelComment?.id} item={item}></Comments>;
        })}
      </div>
    </div>
  );
};

export default CommentsContainer;
