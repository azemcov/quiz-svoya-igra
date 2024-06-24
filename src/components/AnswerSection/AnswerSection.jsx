import Button from "/src/components/Button/Button.jsx";
import classes from "/src/components/AnswerSection/AnswerSection.module.css";
import { useEffect, useState } from "react";

export default function AnswerSection({
  buttonVisibility,
  noAnswer,
  typeOfAnswer,
  answer,
  linkA,
  cat,
  increase,
  decrease,
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
    <>
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
        {typeOfAnswer === "audio" && (
          <>
            <p>{answer}</p>
            <img
              src={"/public/audio.png"}
              alt="audio question"
              className={classes.smallimage}
            />
            <br />
          </>
        )}
        {buttonVisibility && !cat && (
          <Button onClick={() => noAnswer()}>Нет верного ответа</Button>
        )}
        {buttonVisibility && cat && (
          <>
            <Button
              style={{ margin: "10px" }}
              onClick={() => {
                increase(cat);
              }}
            >
              Верно
            </Button>
            <Button
              style={{ margin: "10px" }}
              onClick={() => {
                decrease(cat);
              }}
            >
              Неверно
            </Button>
          </>
        )}
      </div>
    </>
  );
}
