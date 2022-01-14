import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Card from "../components/Card";
import { useAppContext } from "../context/app_context";
import { cardFaceDown } from "../data";

const Cards = () => {
  const { state } = useAppContext();
  const { user, isAuthenticated } = useAuth0();
  const isUser = user && isAuthenticated;

  if (state.allCardsGuessed) {
    return (
      <div className="container congratulations section-p">
        <h2 className="row jus-c">
          You won <br></br>
          <span className="accent">
            {" "}
            {isUser && user.nickname ? user.nickname : "Player"}{" "}
          </span>
          gratz!
        </h2>
        <h3 className="row jus-c al-c">
          Your time is <span className="accent"> {state.timeToShow}</span>
        </h3>
      </div>
    );
  }

  if (state.isGameStarted === false) {
    return (
      <div className="container row jus-c section-p">
        <h2>Click start button</h2>
      </div>
    );
  }

  return (
    <div className="cards-container section-p">
      {state.cards.map((card) => {
        return (
          <Card key={card.arrIndex} {...card} cardFaceDown={cardFaceDown} />
        );
      })}
    </div>
  );
};

export default Cards;
