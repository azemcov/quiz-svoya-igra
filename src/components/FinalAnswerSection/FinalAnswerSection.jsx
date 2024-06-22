import Button from "/src/components/Button/Button.jsx";
import classes from "/src/components/FinalAnswerSection/FinalAnswerSection.module.css";
import { useEffect, useState } from "react";

export default function FinalAnswerSection({
  buttonVisibility,
  typeOfAnswer,
  answer,
  linkA,
  FBS,
  setFBS,
  done,
  setDone,
  allDoneAreNumber,
  setBoardCondition,
}) {
  let [qPicture, setQPicture] = useState("");
  let [playIndex, setPlayIndex] = useState(null);
  let [audioFile, setAudioFile] = useState("");

  useEffect(() => {
    if (playIndex !== null) {
      const audio = new Audio(audioFile);

      function handleEnded() {
        setPlayIndex(null);
      }
      audio.addEventListener("ended", handleEnded);
      audio.play();

      return () => {
        audio.pause();
        audio.currentTime = 0;
        setPlayIndex(null);
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, [playIndex]);

  useEffect(() => {
    if (typeOfAnswer === "picture") {
      setQPicture(linkA);
    } else if (typeOfAnswer === "audio") {
      setAudioFile(linkA);
      setPlayIndex(1);
    }
  }, [typeOfAnswer]);

  return (
    <div className={classes.question}>
      {typeOfAnswer === "text" && <p>{answer}</p>}

      {typeOfAnswer === "picture" && (
        <>
          <p>{answer}</p>
          <img
            src={qPicture}
            alt="picture question"
            className={classes.image}
          />
        </>
      )}

      {typeOfAnswer === "audio" && <p>{answer}</p>}

      <div className={classes.score}>
        {Array.from({ length: 3 }).map((m, i) => (
          <div className={classes.center} key={i}>
            {FBS[`B${i + 1}`] === null && (
              <Button
                onClick={() => setFBS((e) => ({ ...e, [`B${i + 1}`]: true }))}
              >
                true
              </Button>
            )}
            {FBS[`B${i + 1}`] === null && (
              <Button
                onClick={() => setFBS((e) => ({ ...e, [`B${i + 1}`]: false }))}
              >
                false
              </Button>
            )}
            {FBS[`B${i + 1}`] === true && (
              <div>
                <input
                  className={
                    isNaN(done[`D${i + 1}`])
                      ? classes.wrongText
                      : classes.inputText
                  }
                  type="text"
                  placeholder="Ставка п1"
                  onChange={(e) =>
                    setDone((d) => ({
                      ...d,
                      [`D${i + 1}`]:
                        e.target.value.trim() === "" ? NaN : +e.target.value,
                    }))
                  }
                />
              </div>
            )}
            {FBS[`B${i + 1}`] === false && (
              <div>
                <input
                  className={
                    isNaN(done[`D${i + 1}`])
                      ? classes.wrongText
                      : classes.inputText
                  }
                  type="text"
                  placeholder="Ставка н1"
                  onChange={(e) =>
                    setDone((d) => ({
                      ...d,
                      [`D${i + 1}`]:
                        e.target.value.trim() === "" ? NaN : -+e.target.value,
                    }))
                  }
                />
              </div>
            )}
          </div>
        ))}
        {/* граница первой секции ставок */}
      </div>
      {/* граница ввода ставок */}
      {buttonVisibility && allDoneAreNumber() && (
        <Button
          onClick={() => {
            setBoardCondition("end");
          }}
        >
          Результат
        </Button>
      )}
    </div>
  );
}
