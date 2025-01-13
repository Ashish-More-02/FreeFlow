import React, { useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { RandomMessageGenerator } from "../Utils/RandomMessageGenrator";
import { RandomNameGenerator } from "../Utils/RandomNameGenerator";
import { addChatMessage } from "../Redux/Slices/ChatSlice";

const LiveChat = () => {
  const dispatch = useDispatch();
  const chatMessages = useSelector((store) => store.chat.message);

  useEffect(() => {
    const intervalID = setInterval(() => {
      dispatch(
        addChatMessage({
          name: RandomNameGenerator(),
          message: RandomMessageGenerator(),
        })
      );
    }, 2000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);
  return (
    <div className="h-[480px] border border-black rounded-lg w-full mx-auto ml-4 mr-4 ">
        <h1 className="font-semibold text-xl p-2 text-cyan-950 dark:text-blue-300">🔴 Live Chat</h1>
      <div className="flex flex-col-reverse overflow-y-scroll h-[90%] w-full p-2">
        {chatMessages.map((chat) => {
          return (
            <ChatMessage name={chat.name} message={chat.message}></ChatMessage>
          );
        })}
      </div>
    </div>
  );
};

export default LiveChat;
