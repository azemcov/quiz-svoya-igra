import { useState } from "react";
import QuestionButton from "/src/components/QuestionButton/QuestionButton.jsx";
import classes from "/src/components/Line/Line.module.css";
import { round1Questions } from "/data.js";

export default function Line({ children, lineN }) {
  return (
    <div className={classes.line}>
      <div className={classes.normalTheme}>
        <p className={classes.themeText}>{children}</p>
      </div>
      {round1Questions[lineN].line.map((_, i) => (
        <QuestionButton lineN={lineN} columnN={i}>
          {round1Questions[lineN].line[i].price}
        </QuestionButton>
      ))}
    </div>
  );
}
