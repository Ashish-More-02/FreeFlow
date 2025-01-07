import React from "react";
import Sidebar from "./Sidebar";
import MainContainer from "./MainContainer";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const Body = ({isMenuOpen, setIsMenuOpen}) => {
  const togglemenu = useSelector((store) => store.appconfigslice.toggleMenu);

  const date = new Date();
  const year = date.getFullYear();
  
  const month = date.getMonth();

  return (
    <div className="flex w-full">
      {!togglemenu ? "" : <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}></Sidebar>}

      <Outlet></Outlet>
    </div>
  );
};

export default Body;
