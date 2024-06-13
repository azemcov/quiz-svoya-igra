import Button from "/src/components/Button/Button.jsx";
import classes from "/src/components/QuestionSection/QuestionSection.module.css";
import { useEffect, useState } from "react";

export default function QuestionSection({
  buttonVisibility,
  setBoardCondition,

  typeOfQuestion,
  question,
  linkQ,

  playAnswerAudioPicture,
  setPlayAnswerAudioPicture,
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

  return (
    <>
      <div className={classes.question}>
        {typeOfQuestion === "text" && <p>{question}</p>}
        {typeOfQuestion === "picture" && (
          <>
            <p>{question}</p>
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
          </>
        )}
        {buttonVisibility &&
          (typeOfQuestion === "picture" || typeOfQuestion === "audio") && (
            <>
              <Button
                onClick={() => {
                  setPlayAnswerAudioPicture((p) => !p);
                }}
              >
                {typeOfQuestion === "picture"
                  ? "pic"
                  : typeOfQuestion === "audio"
                  ? "au"
                  : 0}
              </Button>
              <br />
              <Button onClick={() => setBoardCondition("answer")}>Ответ</Button>
            </>
          )}
      </div>
    </>
  );
}
