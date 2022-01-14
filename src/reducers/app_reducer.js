import {
  SET_CARDS_AMOUNT,
  SET_MODE,
  SET_CARDS,
  CLICK_ON_CARD,
  CARDS_GUESSED,
  CLOSE_CARDS,
  ALL_CARDS_GUESSED,
} from "../actions";
import { cards } from "../data";

const reducer = (state, action) => {
  if (action.type === SET_CARDS_AMOUNT) {
    return {
      ...state,
      cardsAmount: action.payload,
    };
  }
  if (action.type === SET_MODE) {
    return {
      ...state,
      mode: action.payload,
    };
  }
  if (action.type === SET_CARDS) {
    const newIdArr = action.payload;
    let newCardsArr = [];

    newIdArr.forEach((index, arrIndex) => {
      cards.forEach((card) => {
        if (index === card.id) {
          const newCard = { ...card, arrIndex: arrIndex };
          newCardsArr.push(newCard);
        }
      });
    });
    return {
      ...state,
      cards: newCardsArr,
    };
  }
  if (action.type === CLICK_ON_CARD) {
    const { id: cardArrIndex, cards, mode, prevClickedCardId } = action.payload;
    const clickedCard = cards.filter(
      (card) => card.arrIndex === cardArrIndex
    )[0];

    // console.log(clickedCard);

    let newCards = cards.map((card) => {
      if (card.arrIndex === cardArrIndex) {
        return { ...card, isClicked: true };
      } else {
        return card;
      }
    });
    // console.log(newCards);

    return {
      ...state,
      cards: newCards,
      prevClickedCardId: clickedCard.id,
    };
  }
  if (action.type === CARDS_GUESSED) {
    const guessedId = action.payload;
    const newCards = state.cards.map((card) => {
      if (card.id === guessedId) {
        console.log("guessed index : ", card.arrIndex);
        return { ...card, isClicked: false, isGuessed: true };
      } else {
        return { ...card, isClicked: false };
      }
    });

    return { ...state, cards: newCards };
  }
  if (action.type === CLOSE_CARDS) {
    const { idToClose0, idToClose1 } = action.payload;
    const newCards = state.cards.map((card) => {
      if (card.id === idToClose0 || card.id === idToClose1) {
        return { ...card, isClicked: false, isGuessed: false };
      } else {
        return { ...card, isClicked: false };
      }
    });
    return { ...state, cards: newCards };
  }
  if (action.type === ALL_CARDS_GUESSED) {
    return { ...state, allCardsGuessed: true };
  }
  throw new Error(`${action.type} doesnt exist`);
};

export default reducer;
