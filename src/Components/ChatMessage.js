import React from "react";


const ChatMessage = ({name,message}) => {

  return (
    <div className="my-2 px-2 bg-gray-100 rounded-lg py-1 w-full shadow-lg">
      <div className="flex items-center">
        <img
          className="h-8 mr-1"
          alt="user_logo"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&s"
        ></img>
        <span className="font-semibold">{name}</span>
      </div>
      <span>{message}</span>
    </div>
  );
};

export default ChatMessage;
