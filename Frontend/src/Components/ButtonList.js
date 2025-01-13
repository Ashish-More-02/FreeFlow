import React from "react";
import Button from "./Button";

const ButtonList = () => {
  return (
      <div className="flex items-center w-full overflow-x-scroll no-scrollbar absolute  dark:bg-black dark:text-white">
        <Button name={"All"} />
        <Button name={"gaming"} />
        <Button name={"Music"} />
        <Button name={"Mod"} />
        <Button name={"Minecraft"} />
        <Button name={"Computer_Hardware"} />
        <Button name={"Programming"} />
        <Button name={"Smartphones"} />
        <Button name={"Cooking"} />
        <Button name={"songs"} />
        <Button name={"Watched"} />
        <Button name={"Recentely_uploaded"} />
        <Button name={"New_to_you"} />
      </div>
  );
};

export default ButtonList;
