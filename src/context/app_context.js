import React, { useContext, useState, useReducer, useEffect } from "react";
import {
  SET_CARDS,
  CLICK_ON_CARD,
  CLOSE_CARDS,
  CARDS_GUESSED,
  ALL_CARDS_GUESSED,
} from "../actions";
import { cards } from "../data";
import reducer from "../reducers/app_reducer";

const AppContext = React.createContext();
const initialState = {
  cardsAmount: 4,
  mode: "hard",
  prevClickedCardId: 0,
  allCardsGuessed: false,
  cards: [],
};

export const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const generateCards = () => {
    const firstTempArr = [];
    const secondTempArr = [];
    let randIndex = 0;
    const size = state.cardsAmount / 2;
    for (
      let i = 0;
      firstTempArr.length < size || secondTempArr.length < size;
      i++
    ) {
      randIndex = Math.floor(Math.random() * size + 1);
      if (!firstTempArr.includes(randIndex)) {
        firstTempArr.push(randIndex);
      }
      randIndex = Math.floor(Math.random() * size + 1);
      if (!secondTempArr.includes(randIndex)) {
        secondTempArr.push(randIndex);
      }
    }
    const newIdArr = [...firstTempArr, ...secondTempArr];
    dispatch({ type: SET_CARDS, payload: newIdArr });
  };

  useEffect(() => {
    generateCards();
  }, [state.cardsAmount]);

  useEffect(() => {
    let clickedCards = [];
    const timeout = setTimeout(() => {
      clickedCards = state.cards.filter((card) => card.isClicked);
      console.log("clickedCards : ", clickedCards);
      if (
        clickedCards.length === 2 &&
        clickedCards[0].id === clickedCards[1].id
      ) {
        console.log("cards_guessed");
        dispatch({ type: CARDS_GUESSED, payload: clickedCards[0].id });
      }
      if (
        clickedCards.length === 2 &&
        clickedCards[0].id !== clickedCards[1].id
      ) {
        console.log("cards_closed");
        dispatch({
          type: CLOSE_CARDS,
          payload: {
            idToClose0: clickedCards[0].id,
            idToClose1: clickedCards[1].id,
          },
        });
      }
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [state.cards]);

  useEffect(() => {
    let tempArr = [];
    tempArr = state.cards.filter((card) => card.isGuessed === false);
    console.log("guessedCardsArr : ", tempArr);
    if (tempArr.length === 0 && state.prevClickedCardId !== 0) {
      dispatch({ type: ALL_CARDS_GUESSED });
    }
  }, [state.cards]);

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
