import { useState } from "react";
import QuestionButton from "@components/QuestionButton/QuestionButton.jsx";
import classes from "@components/LineSection/LineSection.module.css";
import {} from "@/data.js";

export default function Line({
  children,
  buttonCondition,
  setButtonCondition,
  setBet,
  setQuestionXY,
  lineN,
  ifItsCat,
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
          buttonCondition={buttonCondition}
          setButtonCondition={setButtonCondition}
          setQuestionXY={setQuestionXY}
          lineN={lineN}
          columnN={i}
          key={i}
          ifItsCat={ifItsCat}
        >
          {buttonCondition[lineN][i]}
        </QuestionButton>
      ))}
    </div>
  );
}
