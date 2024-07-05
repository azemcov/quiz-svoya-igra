import { useState, useEffect } from "react";
import classes from "@components/QuestionButton/QuestionButton.module.css";

export default function QuestionButton({
  children,
  buttonCondition,
  setButtonCondition,
  setQuestionXY,
  lineN,
  columnN,
  onClick,
  ifItsCat,
}) {
  let [buttonClicked, setButtonClicked] = useState(false);
  let [startQuestion, setStartQuestion] = useState(false);

  useEffect(() => {
    startQuestion ? ifItsCat() : 0;
  }, [startQuestion]);

  function flash() {
    setButtonClicked(true);
    setTimeout(() => {
      setButtonCondition(newButtonCondition(lineN, columnN, buttonCondition));
      setButtonClicked(false);
      setStartQuestion(true);
    }, 700);
  }

  function newButtonCondition(l, c, arr) {
    let arr2 = arr.map((m) => [...m]);
    arr2[l][c] = "sleep";
    return arr2;
  }

  return (
    <>
      <button
        onClick={() => {
          onClick();
          setQuestionXY([lineN, columnN]);
          flash();
        }}
        disabled={buttonCondition[lineN][columnN] === "sleep"}
        className={`${classes.normalButton} ${
          buttonClicked === true
            ? classes.blinking
            : buttonCondition[lineN][columnN] === "sleep"
            ? classes.sleep
            : ""
        }`}
      >
        {children}
      </button>
    </>
  );
}
