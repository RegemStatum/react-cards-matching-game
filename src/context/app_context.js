import React, { useContext, useState, useReducer, useEffect } from "react";
import {
  SET_CARDS,
  CLICK_ON_CARD,
  CLOSE_CARDS,
  CARDS_GUESSED,
  ALL_CARDS_GUESSED,
  SET_TIMER,
  RESET_TIMER,
} from "../actions";
import reducer from "../reducers/app_reducer";

const AppContext = React.createContext();

// local storage info
const getLocalStorage = () => {
  let obj = localStorage.getItem("cmg-game");
  if (obj) {
    return JSON.parse(obj);
  } else {
    return { theme: "dark-theme", size: "2x2", hardMode: "true" };
  }
};

const getStorageCardsAmount = () => {
  let cardsAmount = 4;
  if (localStorage.getItem("cmg-game")) {
    let obj = JSON.parse(localStorage.getItem("cmg-game"));
    if (obj.size === "2x2") cardsAmount = 4;
    if (obj.size === "4x2") cardsAmount = 8;
    if (obj.size === "4x4") cardsAmount = 16;
  }
  return cardsAmount;
};

const getStorageHardMode = () => {
  let hardMode = true;
  if (localStorage.getItem("cmg-game")) {
    let obj = JSON.parse(localStorage.getItem("cmg-game"));
    hardMode = obj.hardMode;
  }
  return hardMode;
};

// initial reducer state
const initialState = {
  cardsAmount: getStorageCardsAmount(),
  mode: getStorageHardMode() ? "hard" : "easy",
  prevClickedCardId: 0,
  allCardsGuessed: false,
  isGameStarted: false,
  time: 0,
  timeToShow: "00:00:00",
  cards: [],
};

export const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  // generate random sequence of cards
  const generateCards = () => {
    const newIdArr = [];
    let randValue = -1;
    let elementsWithSameValue = [];

    function generateRandomValue() {
      return Math.floor(Math.random() * (state.cardsAmount / 2) + 1);
    }

    while (newIdArr.length < state.cardsAmount) {
      randValue = generateRandomValue();
      elementsWithSameValue = newIdArr.filter((el) => el === randValue);
      if (!(elementsWithSameValue.length === 2)) {
        newIdArr.push(randValue);
      }
    }
    dispatch({ type: SET_CARDS, payload: newIdArr });
  };

  // timer
  useEffect(() => {
    let interval;
    let time = state.time;

    function timeCount() {
      time += 1;
      dispatch({ type: SET_TIMER, payload: time });
    }

    if (state.isGameStarted) {
      interval = setInterval(timeCount, 1000);
    }
    if (state.isGameStarted === false) {
      dispatch({ type: RESET_TIMER });
    }

    return () => {
      clearInterval(interval);
    };
  }, [state.isGameStarted]);

  // generate cards
  useEffect(() => {
    generateCards();
  }, [state.cardsAmount, state.isGameStarted]);

  // check for clicked cards
  useEffect(() => {
    let clickedCards = [];
    clickedCards = state.cards.filter((card) => card.isClicked);

    const timeout = setTimeout(() => {
      // player guessed 2 cards
      if (
        clickedCards.length === 2 &&
        clickedCards[0].id === clickedCards[1].id
      ) {
        dispatch({ type: CARDS_GUESSED, payload: clickedCards[0].id });
      }
      // player non guessed 2 cards
      if (
        clickedCards.length === 2 &&
        clickedCards[0].id !== clickedCards[1].id
      ) {
        dispatch({
          type: CLOSE_CARDS,
          payload: {
            idToClose0: clickedCards[0].id,
            idToClose1: clickedCards[1].id,
            mode: state.mode,
          },
        });
      }
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [state.cards]);

  // game finished, all cards guessed
  useEffect(() => {
    let tempArr = [];
    tempArr = state.cards.filter((card) => card.isGuessed === false);
    if (tempArr.length === 0 && state.prevClickedCardId !== 0) {
      dispatch({ type: ALL_CARDS_GUESSED });
    }
  }, [state.cards]);

  // on card click
  const handleCardClick = (id) => {
    dispatch({
      type: CLICK_ON_CARD,
      payload: {
        id,
        cards: state.cards,
        mode: state.mode,
        prevClickedCardId: state.prevClickedCardId,
      },
    });
  };

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        handleCardClick,
        dispatch,
        state,
        getLocalStorage,
        getStorageHardMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContext;
