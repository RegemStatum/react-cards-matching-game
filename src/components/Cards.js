import React from "react";
import Card from "../components/Card";
import { useAppContext } from "../context/app_context";
import { cardFaceDown } from "../data";

const Cards = () => {
  const { state } = useAppContext();
  if (state.allCardsGuessed) {
    return (
      <div className="cards-container section-p">
        <h1>You won, gratz!</h1>
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
