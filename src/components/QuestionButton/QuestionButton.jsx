import { useState } from "react";
import { Children } from "react";
import ModalQuestion from "/src/components/modal/ModalQuestion.jsx";
import { round1Questions } from "/data.js";
import classes from "/src/components/QuestionButton/QuestionButton.module.css";

export default function QuestionButton({ children, lineN, columnN, onClick }) {
  let [isModalOpen, setIsModalOpen] = useState(false);
  let [question, setQuestion] = useState("");
  let [isBlinking, setIsBlinking] = useState("ready");

  function flash() {
    onClick();
    setIsBlinking("blink");
    setTimeout(() => {
      setIsBlinking("sleep");
      setIsModalOpen(true);
      setQuestion(round1Questions[lineN].line[columnN].question);
    }, 700);
  }

  return (
    <>
      <button
        onClick={flash}
        disabled={isBlinking === "sleep"}
        className={`${classes.normalButton} ${
          isBlinking === "blink"
            ? classes.blinking
            : isBlinking === "sleep"
            ? classes.sleep
            : ""
        }`}
      >
        {isBlinking === "sleep" ? "" : children}
      </button>
      <ModalQuestion open={isModalOpen}>
        <p>{question}</p>
        <button onClick={() => setIsModalOpen(false)}>закрыть</button>
      </ModalQuestion>
    </>
  );
}
