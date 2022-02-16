import React, { useState, useEffect } from "react";
import { BsSun, BsMoon } from "react-icons/bs";
import { useAppContext } from "../context/app_context";

const getStorageTheme = () => {
  let theme = "dark-theme";
  let cmgGame = localStorage.getItem("cmg-game");
  if (cmgGame) {
    const obj = JSON.parse(cmgGame);
    theme = obj.theme;
  }
  return theme;
};

const ChangeThemeButton = () => {
  const [theme, setTheme] = useState(getStorageTheme());
  const { getLocalStorage } = useAppContext();

  useEffect(() => {
    if (theme === "light-theme") {
      document.body.classList.add("light-theme");
      localStorage.setItem(
        "cmg-game",
        JSON.stringify({ ...getLocalStorage(), theme: "light-theme" })
      );
    } else {
      document.body.classList.remove("light-theme");
      localStorage.setItem(
        "cmg-game",
        JSON.stringify({ ...getLocalStorage(), theme: "dark-theme" })
      );
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
