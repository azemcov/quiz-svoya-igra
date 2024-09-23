import { useState, useEffect } from 'react';
import QuestionButton from '@components/QuestionButton/QuestionButton.jsx';
import classes from '@components/LineSection/LineSection.module.css';
import {} from '@/data.js';

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
  // let [overflow, setOverflow] = useState(false);
  function flash() {
    setButtonClicked(true);
    setTimeout(() => {
      setButtonClicked(false);
    }, 700);
  }
  // useEffect(() => {
  //   let container = document.getElementById(`${lineN}-container`);
  //   let text = document.getElementById(`${lineN}-text`);
  //   if (text.scrollHeight > container.clientHeight) {
  //     setOverflow(true);
  //   }
  //   return undefined;
  // }, [document.scrollHeight]);

  return (
    <div className={classes.line}>
      <div
        id={`${lineN}-container`}
        className={`${classes.theme} ${buttonClicked ? classes.blinking : ''}`}
      >
        <p id={`${lineN}-text`} className={`${classes.text}`}>
          {children}
        </p>
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
          key={`questionButtonKeys-${lineN}-${i}`}
          ifItsCat={ifItsCat}
        >
          {buttonCondition[lineN][i]}
        </QuestionButton>
      ))}
    </div>
  );
}
