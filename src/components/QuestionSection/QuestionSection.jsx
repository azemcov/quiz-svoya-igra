import Button from "@components/Button/Button.jsx";
import classes from "@components/QuestionSection/QuestionSection.module.css";
import audioImage from "@images/audio.png";
import { useEffect, useState } from "react";

export default function QuestionSection({
  buttonVisibility,
  setBoardCondition,

  typeOfQuestion,
  question,
  linkQ,

  playAnswerAudioPicture,
  setPlayAnswerAudioPicture,
  final,

  music,
}) {
  let [qPicture, setQPicture] = useState("");
  let [plays, setPlays] = useState(false);
  let [audioFile, setAudioFile] = useState("");

  let [showPic, setShowPic] = useState(false);

  useEffect(() => {
    playAnswerAudioPicture === true ? setShowPic(true) : 0;
  }, [playAnswerAudioPicture]);

  useEffect(() => {
    if (plays) {
      const audio = new Audio(audioFile);

      function handleEnded() {
        setPlays(false);
      }
      audio.addEventListener("ended", handleEnded);
      audio.play();

      return () => {
        audio.pause();
        audio.currentTime = 0;
        setPlays(false);
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, [plays]);

  useEffect(() => {
    if (typeOfQuestion === "picture") {
      setQPicture(linkQ);
    } else if (typeOfQuestion === "audio") {
      setAudioFile(linkQ);
    }
  }, [typeOfQuestion]);

  useEffect(() => {
    setPlays(playAnswerAudioPicture);
  }, [playAnswerAudioPicture]);

  useEffect(() => {
    if (showPic && typeof final === "number" && typeOfQuestion !== "audio") {
      music(4);
    }
  }, [showPic]);

  return (
    <>
      <div className={classes.question}>
        {typeOfQuestion === "text" && (
          <>
            <p>{question}</p>
            {!showPic && typeof final === "number" && <p>{"(30 секунд)"}</p>}
          </>
        )}

        {typeOfQuestion === "picture" && (
          <>
            <p>{question}</p>
            {!showPic && typeof final !== "number" && <p>{"(Фото)"}</p>}
            {!showPic && typeof final === "number" && (
              <p>{"(Фото) (30 секунд)"}</p>
            )}

            {showPic && (
              <img
                src={qPicture}
                alt="picture question"
                className={classes.image}
              />
            )}
          </>
        )}
        {typeOfQuestion === "audio" && (
          <>
            <p>{question}</p>
            <img
              src={audioImage}
              alt="audio question"
              className={classes.smallimage}
            />
          </>
        )}
        {buttonVisibility &&
          ((typeOfQuestion === "picture" && !showPic) ||
            typeOfQuestion === "audio" ||
            ((typeOfQuestion === "picture" || typeOfQuestion === "text") &&
              typeof final === "number" &&
              !showPic)) && (
            <>
              <Button
                onClick={() => {
                  setPlayAnswerAudioPicture((p) => !p);
                }}
              >
                {
                  typeOfQuestion === "picture" && typeof final === "number"
                    ? "Показать изображение таймер 30 секунд"
                    : typeOfQuestion === "picture"
                    ? "Показать изображение"
                    : typeOfQuestion === "audio"
                    ? "Старт/стоп"
                    : typeOfQuestion === "text" && typeof final === "number"
                    ? "Таймер 30 секунд"
                    : null /* В случае, если ни одно условие не выполнено */
                }
              </Button>
              <br />
            </>
          )}
        {typeof final === "number"
          ? buttonVisibility &&
            showPic && (
              <>
                <Button
                  onClick={() =>
                    final !== false
                      ? setBoardCondition("finalAnswer")
                      : setBoardCondition("answer")
                  }
                >
                  Ответ
                </Button>
              </>
            )
          : buttonVisibility && (
              <>
                <Button
                  onClick={() =>
                    final !== false
                      ? setBoardCondition("finalAnswer")
                      : setBoardCondition("answer")
                  }
                >
                  Ответ
                </Button>
              </>
            )}
      </div>
    </>
  );
}
