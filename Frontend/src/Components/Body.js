import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import useScreenSize from "../Utils/useScreenSize";
import { closeMenu, openMenu } from "../Redux/Slices/appConfigSlice";

const Body = ({ isMenuOpen, setIsMenuOpen }) => {
  const togglemenu = useSelector((store) => store.appconfigslice.toggleMenu);
  const dispatch = useDispatch();
  const screenSize = useScreenSize();

  useEffect(() => {
    if (screenSize.width < 640) {
      dispatch(closeMenu());
    } else {
      dispatch(openMenu());
    }
  }, [screenSize.width, dispatch]);

  return (
    <div className="flex w-full">

      {togglemenu ? <Sidebar></Sidebar>: ""}

      <Outlet></Outlet>
    </div>
  );
};

export default Body;
