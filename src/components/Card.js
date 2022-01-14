import React from "react";
import { useAppContext } from "../context/app_context";

const Card = ({
  id,
  img,
  name,
  cardFaceDown,
  isClicked,
  isGuessed,
  arrIndex,
}) => {
  const { handleCardClick } = useAppContext();

  return (
    <div
      className={`card ${isClicked || isGuessed ? "show" : ""}`}
      onClick={() => {
        handleCardClick(arrIndex);
      }}
    >
      <div className="card-inner">
        <div className="card-front">
          <img src={cardFaceDown} alt={name} />
        </div>
        <div className="card-back">
          <img src={img} alt={name} />
        </div>
      </div>
      card {id}
    </div>
  );
};

export default Card;
