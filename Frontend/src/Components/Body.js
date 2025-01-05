import React from "react";
import Sidebar from "./Sidebar";
import MainContainer from "./MainContainer";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const Body = () => {
  const togglemenu = useSelector((store) => store.appconfigslice.toggleMenu);

  const date = new Date();
  const year = date.getFullYear();
  
  const month = date.getMonth();

  return (
    <div className="flex w-[100vw]">
      {!togglemenu ? "" : <Sidebar></Sidebar>}

      <Outlet></Outlet>
    </div>
  );
};

export default Body;
