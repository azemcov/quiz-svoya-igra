import { useState } from "react";
import QuestionButton from "/src/components/QuestionButton/QuestionButton.jsx";
import classes from "/src/components/Line/Line.module.css";
import { round1Questions } from "/data.js";
import ModalQuestion from "/src/components/modal/ModalQuestion.jsx";

export default function Line({ children, lineN }) {
  let [isModalOpen, setIsModalOpen] = useState(false);
  let [actualQuestion, setActualQuestion] = useState("");

  return (
    <div className={classes.line}>
      <div className={classes.normalTheme}>
        <p className={classes.themeText}>{children}</p>
      </div>
      {round1Questions[lineN].line.map((_, i) => (
        <QuestionButton
          onClick={() => {
            setIsModalOpen(true);
            setActualQuestion(round1Questions[lineN].line[i].question);
          }}
        >
          {round1Questions[lineN].line[i].price}
        </QuestionButton>
      ))}
      <ModalQuestion open={isModalOpen}>
        <p>{actualQuestion}</p>
        <button onClick={() => setIsModalOpen(false)}>закрыть</button>
      </ModalQuestion>
    </div>
  );
}
