import React, { useState, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useAppContext } from "../context/app_context";
import { SET_CARDS_AMOUNT, SET_MODE } from "../actions";

const getStorageSize = () => {
  let size = "2x2";
  if (localStorage.getItem("cmg-game")) {
    let obj = JSON.parse(localStorage.getItem("cmg-game"));
    size = obj.size;
  }
  return size;
};

const Control = () => {
  const { dispatch, getLocalStorage, getStorageHardMode } = useAppContext();
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [isModeOpen, setIsModeOpen] = useState(false);
  const [isHardMode, setIsHardMode] = useState(getStorageHardMode());
  const [currentSize, setCurrentSize] = useState(getStorageSize());

  const size2 = useRef(null);
  const size3 = useRef(null);
  const size4 = useRef(null);

  const chooseSize = (id) => {
    let size = 4;

    size2.current.classList.remove("chosen");
    size3.current.classList.remove("chosen");
    size4.current.classList.remove("chosen");

    if (id === 2) {
      size2.current.classList.add("chosen");
      setCurrentSize("2x2");
      localStorage.setItem(
        "cmg-game",
        JSON.stringify({ ...getLocalStorage(), size: "2x2" })
      );
      size = 4;
    }
    if (id === 3) {
      size3.current.classList.add("chosen");
      setCurrentSize("4x2");
      localStorage.setItem(
        "cmg-game",
        JSON.stringify({ ...getLocalStorage(), size: "4x2" })
      );
      size = 8;
    }
    if (id === 4) {
      size4.current.classList.add("chosen");
      setCurrentSize("4x4");
      localStorage.setItem(
        "cmg-game",
        JSON.stringify({ ...getLocalStorage(), size: "4x4" })
      );
      size = 16;
    }
    dispatch({ type: SET_CARDS_AMOUNT, payload: size });
  };

  return (
    <div className="control row w-100 jus-c al-c">
      <div className="control-item control-time">
        <p>00:00:00</p>
      </div>
      <button className="control-item control-start sb">Start</button>
      <div
        className="control-item control-size"
        onClick={() => {
          setIsSizeOpen(!isSizeOpen);
        }}
      >
        <IoIosArrowDown className="control-arrow" />
        <div className="control-size-item  size-1 chosen">
          <p>{currentSize}</p>
        </div>
        <div className={`sizes ${isSizeOpen ? "shown" : ""}`}>
          <div
            className="control-size-item size-2 chosen"
            ref={size2}
            onClick={() => {
              chooseSize(2);
            }}
          >
            <p>2x2</p>
          </div>
          <div
            className="control-size-item size-3"
            ref={size3}
            onClick={() => {
              chooseSize(3);
            }}
          >
            <p>4x2</p>
          </div>
          <div
            className="control-size-item size-4"
            ref={size4}
            onClick={() => {
              chooseSize(4);
            }}
          >
            <p>4x4</p>
          </div>
        </div>
      </div>

      <div className="control-item control-diff">
        <IoIosArrowDown className="control-arrow" />
        <div
          className={`control-diff-item  diff-1 chosen ${
            isHardMode ? "hard" : "easy"
          }`}
          onClick={() => {
            setIsModeOpen(!isModeOpen);
          }}
        >
          <p>{isHardMode ? "Hard" : "Easy"}</p>
        </div>
        <div className={`diff ${isModeOpen ? "shown" : ""}`}>
          <div
            className={`control-diff-item diff-2 ${
              !isHardMode ? "chosen" : ""
            }`}
            onClick={() => {
              setIsHardMode(false);
              localStorage.setItem(
                "cmg-game",
                JSON.stringify({ ...getLocalStorage(), hardMode: false })
              );
              dispatch({ type: SET_MODE, payload: "easy" });
              setIsModeOpen(!isModeOpen);
            }}
          >
            <p>Easy</p>
          </div>
          <div
            className={`control-diff-item diff-3 ${isHardMode ? "chosen" : ""}`}
            onClick={() => {
              setIsHardMode(true);
              localStorage.setItem(
                "cmg-game",
                JSON.stringify({ ...getLocalStorage(), hardMode: true })
              );
              dispatch({ type: SET_MODE, payload: "hard" });
              setIsModeOpen(!isModeOpen);
            }}
          >
            <p>Hard</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Control;
