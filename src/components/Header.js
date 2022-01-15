import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import Sidebar from "./Sidebar";
import { GiCardExchange } from "react-icons/gi";
import { GoThreeBars } from "react-icons/go";
import { useAppContext } from "../context/app_context";

const Header = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useAppContext();

  return (
    <header className="header container">
      <div className="row al-c">
        <Link to="/" className="logo row al-c">
          <GiCardExchange />
          <h1>CMG</h1>
        </Link>
        <div className="header-nav">
          <Navigation />
          <GoThreeBars
            className="mob-menu"
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
            }}
          />
          <Sidebar />
        </div>
      </div>
    </header>
  );
};

export default Header;
