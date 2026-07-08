import React, { useEffect, useState } from "react";
import { YOUTUBE_COMMENTS_API } from "../Utils/Constants";
import { useSearchParams } from "react-router-dom";
import Comments from "./Comments";
import { SOFT_GRADIENT } from "../Utils/theme";

const CommentsContainer = () => {
  const [TOPcomments, setTOPComments] = useState([]);

  // we are using this search params to get the videoID , it searches for the text "v"
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  useEffect(() => {
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  const getComments = async () => {
    try {
      const data = await fetch(
        YOUTUBE_COMMENTS_API +
          videoId +
          "&key=AIzaSyCnIGheBghd1RUSMtEb7KrflcrpUCoyNYA"
      );
      const jsonData = await data.json();
      // API can return an error object (e.g. comments disabled) with no items.
      setTOPComments(Array.isArray(jsonData.items) ? jsonData.items : []);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setTOPComments([]);
    }
  };
  return (
    <div className="my-6 w-full dark:text-white">
      <h1 className="text-xl font-bold mb-4">
        {TOPcomments.length > 0
          ? `${TOPcomments.length} Comments`
          : "Comments"}
      </h1>

      {/* Not wired up yet: prevent the default submit (Enter would reload the
          page and reset state) until commenting is implemented. */}
      <form
        className="flex items-center gap-3 mb-8"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder="Add a comment…"
          className="flex-grow bg-transparent border-b border-gray-300 focus:border-[#8494FF] dark:border-gray-600 dark:focus:border-[#8494FF] outline-none py-2 px-1 transition-colors"
        />
        <button
          type="button"
          style={{ backgroundImage: SOFT_GRADIENT }}
          className="px-5 py-2 rounded-full text-[#141026] font-semibold text-sm shadow-md shadow-indigo-500/20 transition-transform hover:scale-[1.03]"
        >
          Comment
        </button>
      </form>

      <div className="flex flex-col gap-5">
        {TOPcomments.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No comments to show.
          </p>
        )}
        {TOPcomments.map((item) => (
          <Comments key={item.snippet?.topLevelComment?.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CommentsContainer;
