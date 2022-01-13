import React, { useState, useEffect } from "react";
import { Button } from ".";

const ChangeThemeButton = () => {
  const [isLightTheme, setIsLightTheme] = useState(false);

  useEffect(() => {
    if (isLightTheme) {
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
    }
  }, [isLightTheme]);

  return (
    <Button
      onClick={() => {
        setIsLightTheme(!isLightTheme);
      }}
    >
      my button
    </Button>
  );
};

export default ChangeThemeButton;
