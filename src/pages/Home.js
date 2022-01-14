import React from "react";
import Button from "../components/Button";
import { useAppContext } from "../context/app_context";
import Control from "../components/Control";
import Cards from "../components/Cards";

const Home = () => {
  return (
    <main className="home-page container section-p page-min-height">
      <Control />
      <Cards />
    </main>
  );
};

export default Home;
