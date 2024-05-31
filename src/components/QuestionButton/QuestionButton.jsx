import { useState } from "react";
import classes from "/src/components/QuestionButton/QuestionButton.module.css";
console.log();

export default function QuestionButton({
  children,
  setBoardCondition,
  buttonCondition,
  setButtonCondition,
  setQuestionXY,
  lineN,
  columnN,
  onClick,
}) {
  let [buttonClicked, setButtonClicked] = useState(false);

  function flash() {
    setButtonClicked(true);
    setTimeout(() => {
      setButtonClicked(false);
      setButtonCondition(newButtonCondition(lineN, columnN, buttonCondition));
      setBoardCondition("question");
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
