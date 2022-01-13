import React, { useState, useEffect } from "react";
import { BsSun, BsMoon } from "react-icons/bs";

const getStorageTheme = () => {
  let theme = "dark-theme";
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  }
  return theme;
};

const ChangeThemeButton = () => {
  const [theme, setTheme] = useState(getStorageTheme());

  useEffect(() => {
    if (theme === "light-theme") {
      document.body.classList.add("light-theme");
      localStorage.setItem("theme", "light-theme");
    } else {
      document.body.classList.remove("light-theme");
      localStorage.setItem("theme", "dark-theme");
    }
  }, [theme]);

  return (
    <div className="change-theme-btns row al-c jus-c">
      <BsMoon
        className="change-theme-btn"
        onClick={() => {
          setTheme("dark-theme");
        }}
      />
      <BsSun
        className="change-theme-btn"
        onClick={() => {
          setTheme("light-theme");
        }}
      />
    </div>
  );
};

export default ChangeThemeButton;
