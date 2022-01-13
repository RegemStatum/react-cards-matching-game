import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/app_context";
import LoginImg from "./LoginImg";
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
        to="/feedback"
        onClick={() => {
          setIsSidebarOpen(false);
        }}
      >
        Feedback
      </Link>

      <Link
        to="/login"
        onClick={() => {
          setIsSidebarOpen(false);
        }}
      >
        <LoginImg></LoginImg>
      </Link>
      <ChangeThemeButton />
    </nav>
  );
};

export default Navigation;
