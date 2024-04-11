import { useState } from "react";
import QuestionButton from "/src/components/QuestionButton/QuestionButton.jsx";
import classes from "/src/components/LineSection/LineSection.module.css";
import {} from "/data.js";

export default function Line({
  children,
  setBoardCondition,
  buttonCondition,
  setButtonCondition,
  setBet,
  setQuestionXY,
  lineN,
}) {
  let [buttonClicked, setButtonClicked] = useState(false);
  function flash() {
    setButtonClicked(true);
    setTimeout(() => {
      setButtonClicked(false);
    }, 700);
  }

  return (
    <div className={classes.line}>
      <div
        className={`${classes.theme} ${buttonClicked ? classes.blinking : ""}`}
      >
        <p className={classes.text}>{children}</p>
      </div>

      {buttonCondition[lineN].map((_, i) => (
        <QuestionButton
          onClick={() => {
            flash();
            setBet(buttonCondition[lineN][i]);
          }}
          setBoardCondition={setBoardCondition}
          buttonCondition={buttonCondition}
          setButtonCondition={setButtonCondition}
          setQuestionXY={setQuestionXY}
          lineN={lineN}
          columnN={i}
          key={i}
        >
          {buttonCondition[lineN][i]}
        </QuestionButton>
      ))}
    </div>
  );
}
