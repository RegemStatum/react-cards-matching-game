import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/app_context";
import ChangeThemeButton from "./ChangeThemeButton";

const Navigation = () => {
  const { setIsSidebarOpen } = useAppContext();

  return (
    <nav className="nav row al-c sb">
      <Link
        to="/"
        onClick={() => {
          setIsSidebarOpen(false);
        }}
      >
        Home
      </Link>
      <Link
        to="/login"
        onClick={() => {
          setIsSidebarOpen(false);
        }}
      >
        Login
      </Link>
      <Link
        to="/feedback"
        onClick={() => {
          setIsSidebarOpen(false);
        }}
      >
        Feedback
      </Link>
      <ChangeThemeButton />
    </nav>
  );
};

export default Navigation;
