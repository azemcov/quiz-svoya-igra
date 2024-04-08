import { useState } from "react";
import QuestionButton from "/src/components/QuestionButton/QuestionButton.jsx";
import classes from "/src/components/Line/Line.module.css";
import { round1Questions } from "/data.js";

export default function Line({ children, lineN }) {
  let [isButtonClicked, setIsButtonClicked] = useState(false);

  function flash() {
    setIsButtonClicked(true);
    setTimeout(() => {
      setIsButtonClicked(false);
    }, 700);
  }
  return (
    <div className={classes.line}>
      <div
        className={`${classes.theme} ${
          isButtonClicked ? classes.blinking : ""
        }`}
      >
        <p className={classes.text}>{children}</p>
      </div>
      {round1Questions[lineN].line.map((_, i) => (
        <QuestionButton onClick={flash} lineN={lineN} columnN={i}>
          {round1Questions[lineN].line[i].price}
        </QuestionButton>
      ))}
    </div>
  );
}
