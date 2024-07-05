import { useState } from "react";
import classes from "@components/FinalSection/FinalSection.module.css";

export default function FinalSection({
  importedFinalQuestions,
  finalCondition,
  setFinalCondition,
  setBoardCondition,
  setButtonVisibility,
  setFinal,
}) {
  let [buttonClicked, setButtonClicked] = useState([0, 0, 0, 0, 0, 0, 0]);
  let [isLast, setIsLast] = useState(8);
  function flash(num) {
    setButtonClicked(click(num));
    setIsLast(isLast - 1);
    setTimeout(() => {
      setButtonClicked([0, 0, 0, 0, 0, 0, 0]);
      setFinalCondition(
        (newButtonCondition(num, finalCondition).reduce((a, c) => a + c) === 0
          ? (setBoardCondition("question"), setFinal(num))
          : 0,
        newButtonCondition(num, finalCondition))
      );
    }, 700);
  }

  function click(num) {
    let arr = [[0, 0, 0, 0, 0, 0, 0]];
    arr[num] = 1;
    return arr;
  }

  function newButtonCondition(num, arr) {
    let arr2 = [...arr];
    arr2[num] = 0;
    return arr2;
  }

  return (
    <>
      <div className={classes.final}>
        {importedFinalQuestions.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              flash(i);
            }}
            className={`${classes.theme} ${
              buttonClicked[i] === 1 &&
              finalCondition.reduce((a, c) => a + c) > 1
                ? classes.delete
                : buttonClicked[i] === 1 &&
                  finalCondition.reduce((a, c) => a + c) === 1
                ? classes.blinking
                : finalCondition[i] === 0
                ? classes.sleep
                : ""
            }`}
            disabled={finalCondition[i] !== 1}
          >
            <p>{`№ ${i + 1}  ${importedFinalQuestions[i].theme}`}</p>
          </button>
        ))}
      </div>
    </>
  );
}
