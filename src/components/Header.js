import React from "react";
import { GiCardExchange } from "react-icons/gi";

const Header = () => {
  return (
    <header className="header container">
      <div className="logo row">
        <GiCardExchange />
        <h1>CMG</h1>
      </div>
    </header>
  );
};

export default Header;
