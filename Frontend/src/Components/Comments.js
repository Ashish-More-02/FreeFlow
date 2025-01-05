import React from "react";

const Comments = ({ item }) => {
  const { authorProfileImageUrl, authorDisplayName, textOriginal } =
    item?.snippet?.topLevelComment?.snippet || {};

  // Safely access the comments array with fallback to empty array
  const comments = item?.replies?.comments || [];

  return (
    <div className="p-2">
      {/* Commenter profile info */}
      <div className="flex items-center">
        <img
          className="rounded-full h-10 p-1 m-1"
          src={
            authorProfileImageUrl
              ? authorProfileImageUrl
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&s"
          }
          alt={authorDisplayName}
        />
        <h1>{authorDisplayName}</h1>
      </div>

      {/* Actual comment */}
      <div className="pl-10">
        <p>{textOriginal}</p>
      </div>

      {/* Replies */}
      {comments.map((oneComment) => {
        const {
          authorProfileImageUrl: replyAuthorProfileImageUrl,
          authorDisplayName: replyAuthorDisplayName,
          textOriginal: replyTextOriginal,
        } = oneComment?.snippet || {};

        return (
          <div
            key={replyAuthorDisplayName}
            className="pl-10 my-4 border border-l-black"
          >
            <div className="flex items-center">
              <img
                className="rounded-full h-10 p-1 m-1"
                src={
                  replyAuthorProfileImageUrl
                    ? replyAuthorProfileImageUrl
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&s"
                }
                alt={replyAuthorDisplayName}
              />
              <h1>{replyAuthorDisplayName}</h1>
            </div>
            {/* Actual reply */}
            <div className="pl-10">
              <p>{replyTextOriginal}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
