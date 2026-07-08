import React from "react";
import { DEFAULT_AVATAR } from "../Utils/Constants";

const CommentRow = ({ image, name, text, small }) => (
  <div className="flex gap-3">
    <img
      className={`${
        small ? "h-8 w-8" : "h-10 w-10"
      } rounded-full object-cover flex-shrink-0 bg-gray-300 dark:bg-gray-700`}
      src={image || DEFAULT_AVATAR}
      alt={name}
      loading="lazy"
      onError={(e) => {
        e.currentTarget.src = DEFAULT_AVATAR;
      }}
    />
    <div className="min-w-0">
      <p className="text-sm font-semibold text-gray-900 dark:text-white">
        {name}
      </p>
      <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line break-words">
        {text}
      </p>
    </div>
  </div>
);

const Comments = ({ item }) => {
  const { authorProfileImageUrl, authorDisplayName, textOriginal } =
    item?.snippet?.topLevelComment?.snippet || {};

  const replies = item?.replies?.comments || [];

  return (
    <div>
      <CommentRow
        image={authorProfileImageUrl}
        name={authorDisplayName}
        text={textOriginal}
      />

      {replies.length > 0 && (
        <div className="mt-3 ml-12 flex flex-col gap-3 border-l border-gray-200 dark:border-gray-700 pl-4">
          {replies.map((reply, index) => {
            const s = reply?.snippet || {};
            return (
              <CommentRow
                key={s.authorDisplayName ? s.authorDisplayName + index : index}
                image={s.authorProfileImageUrl}
                name={s.authorDisplayName}
                text={s.textOriginal}
                small
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Comments;
