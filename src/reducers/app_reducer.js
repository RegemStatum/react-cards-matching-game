import {
  SET_CARDS_AMOUNT,
  SET_MODE,
  SET_CARDS,
  CLICK_ON_CARD,
  CARDS_GUESSED,
  CLOSE_CARDS,
  ALL_CARDS_GUESSED,
  START_GAME,
  SET_TIMER,
  RESET_TIMER,
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
    const { id: cardArrIndex } = action.payload;

    const clickedCardArr = state.cards.filter((card) => card.isClicked);
    if (clickedCardArr.length === 2) {
      return { ...state };
    }

    const clickedCard = state.cards.filter(
      (card) => card.arrIndex === cardArrIndex
    )[0];
    let newCards = state.cards.map((card) => {
      if (card.arrIndex === cardArrIndex) {
        return { ...card, isClicked: true };
      } else {
        return card;
      }
    });
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
        return { ...card, isClicked: false, isGuessed: true };
      } else {
        return { ...card, isClicked: false };
      }
    });

    return { ...state, cards: newCards };
  }
  if (action.type === CLOSE_CARDS) {
    const { idToClose0, idToClose1, mode } = action.payload;
    const newCards = state.cards.map((card) => {
      if (mode === "easy") {
        if (card.id === idToClose0 || card.id === idToClose1) {
          return { ...card, isClicked: false, isGuessed: false };
        } else {
          return { ...card, isClicked: false };
        }
      }
      if (mode === "hard") {
        return { ...card, isClicked: false, isGuessed: false };
      }
    });
    return { ...state, cards: newCards };
  }
  if (action.type === ALL_CARDS_GUESSED) {
    return { ...state, allCardsGuessed: true, isGameStarted: false };
  }
  if (action.type === START_GAME) {
    return { ...state, allCardsGuessed: false, isGameStarted: true };
  }
  if (action.type === SET_TIMER) {
    let time = action.payload;
    let timeToShow = "00:00:00";

    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time - hours * 3600) / 60);
    let seconds = time - hours * 3600 - minutes * 60;

    const addZeroToBegin = (el) => {
      if (el < 10) {
        return `0${el}`;
      } else return String(el);
    };

    timeToShow = `${addZeroToBegin(hours)}:${addZeroToBegin(
      minutes
    )}:${addZeroToBegin(seconds)}`;

    return {
      ...state,
      time: action.payload.time,
      timeToShow,
    };
  }
  if (action.type === RESET_TIMER) {
    return { ...state, time: 0 };
  }
  throw new Error(`${action.type} doesnt exist`);
};

export default reducer;
