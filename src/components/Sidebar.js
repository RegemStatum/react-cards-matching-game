import React from "react";
import Navigation from "./Navigation";
import { AiFillCloseSquare } from "react-icons/ai";
import { useAppContext } from "../context/app_context";

const Sidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useAppContext();

  return (
    <aside className={`sidebar ${isSidebarOpen ? "show" : ""}`}>
      <AiFillCloseSquare
        className="btn-close"
        onClick={() => {
          setIsSidebarOpen(false);
        }}
      />
      <Navigation />
    </aside>
  );
};

export default Sidebar;
