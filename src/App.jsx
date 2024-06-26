import { useState, useEffect } from "react";
import { allRoundQuetions, finalQuestions } from "/data.js";
import LineSection from "/src/components/LineSection/LineSection.jsx";
import ScoreSection from "/src/components/ScoreSection/ScoreSection.jsx";
import QuestionSection from "/src/components/QuestionSection/QuestionSection.jsx";
import ResultSection from "/src/components/ResultSection/ResultSection.jsx";
import FinalSection from "/src/components/FinalSection/FinalSection.jsx";
import AdSection from "./components/AdSection/AdSection.jsx";
import StartSection from "/src/components/StartSection/StartSection.jsx";
import RegistrationSection from "/src/components/RegistrationSection/RegistrationSection.jsx";
import AnswerSection from "./components/AnswerSection/AnswerSection.jsx";
import CatAdSection from "./components/CatAdSection/CatAdSection.jsx";
import FinalAnswerSection from "./components/FinalAnswerSection/FinalAnswerSection.jsx";
import ModalSection from "./components/ModalSection/ModalSection.jsx";

export default function App() {
  let [roundN, setRoundN] = useState(0);
  let qtyOfRounds = allRoundQuetions.length;
  let [actualRound, setActualRound] = useState(
    roundN !== "final"
      ? [...allRoundQuetions[roundN]]
      : [...allRoundQuetions[0]]
  );
  let [boardCondition, setBoardCondition] = useState("start");
  let [buttonCondition, setButtonCondition] = useState(
    Array(6).fill([
      (roundN + 1) * 1 * 100,
      (roundN + 1) * 2 * 100,
      (roundN + 1) * 3 * 100,
      (roundN + 1) * 4 * 100,
      (roundN + 1) * 5 * 100,
      (roundN + 1) * 6 * 100,
      (roundN + 1) * 7 * 100,
    ])
  );
  let [finalCondition, setFinalCondition] = useState([1, 1, 1, 1, 1, 1, 1]);
  let [bet, setBet] = useState(0);
  let [teams, setTeams] = useState({
    team1: "",
    team2: "",
    team3: "",
  });
  let [score, setScore] = useState({
    score1: 0,
    score2: 0,
    score3: 0,
  });
  let [questionXY, setQuestionXY] = useState([0, 0]);
  let [buttonClicked, setButtonClicked] = useState({ 1: 0, 2: 0, 3: 0 });
  let [buttonVisibility, setButtonVisibility] = useState(false);
  let [final, setFinal] = useState(false);
  let [playAnswerAudioPicture, setPlayAnswerAudioPicture] = useState(false);

  useEffect(() => {
    return setPlayAnswerAudioPicture(false);
  }, [boardCondition]);
  let [playIndex, setPlayIndex] = useState(null);
  let audioFiles = [
    "/public/0_start.mp3",
    "/public/1_table.mp3",
    "/public/2_round_end.mp3",
    "/public/3_final_start.mp3",
    "/public/4_final_30sec.mp3",
    "/public/5_end.mp3",
    "/public/6_incorrect.mp3",
    "/public/7_noanswer.mp3",
    "/public/8_applause.mp3",
    "/public/9_cat.mp3",
  ];

  let [FBS, setFBS] = useState({ B1: null, B2: null, B3: null });
  let [done, setDone] = useState({ D1: NaN, D2: NaN, D3: NaN });

  let [allDoneAreNumber, setAllDoneAreNumber] = useState(false);
  let [cat, setCat] = useState(false);

  let [end, setEnd] = useState("");
  let [modal, setModal] = useState(false);

  useEffect(() => {
    !Number.isNaN(done.D1) &&
    !Number.isNaN(done.D2) &&
    !Number.isNaN(done.D3) &&
    //
    (score.score1 < 0
      ? done.D1 === 0
      : score.score1 - Math.abs(done.D1) >= 0) &&
    (score.score2 < 0
      ? done.D2 === 0
      : score.score2 - Math.abs(done.D2) >= 0) &&
    (score.score3 < 0 ? done.D3 === 0 : score.score3 - Math.abs(done.D3) >= 0)
      ? setAllDoneAreNumber(true)
      : setAllDoneAreNumber(false);
  }, [done]);

  useEffect(() => {
    if (playIndex !== null) {
      const audio = new Audio(audioFiles[playIndex]);

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
  }, [playIndex, boardCondition, score]);

  useEffect(() => {
    function keyboard(event) {
      if (event.code === "Enter") {
        if (boardCondition === "start") {
          setBoardCondition("registration");
          setPlayIndex(0);
        } else if (boardCondition === "registration") {
          if (teams.team1 !== "" && teams.team2 !== "" && teams.team3 !== "") {
            setBoardCondition("tableAd");
          }
        } else if (boardCondition === "tableAd") {
          setBoardCondition("table");
          setPlayIndex(1);
          setTimeout(() => setPlayIndex(1), 1);
        } else if (boardCondition === "question") {
          setPlayAnswerAudioPicture((p) => !p);
        } else if (boardCondition === "finalAd") {
          setBoardCondition("final");
          setPlayIndex(1);
          setTimeout(() => setPlayIndex(1), 1);
        } else if (boardCondition === "results" && boardCondition !== "end") {
          roundN < qtyOfRounds - 1
            ? (setActualRound([...allRoundQuetions[roundN]]),
              setRoundN(roundN + 1),
              setBoardCondition("tableAd"))
            : (setBoardCondition("finalAd"), setRoundN("final"));
        } else if (boardCondition === "finalAnswer" && allDoneAreNumber) {
          finalScore();
          setBoardCondition("end");
        }
      } else if (boardCondition === "question" && bet !== 0) {
        if (event.key === "=") {
          setBoardCondition("answer");
        }
        if (cat === false) {
          if (event.key === "1") {
            increase(1);
          } else if (event.key === "q" || event.key === "й") {
            decrease(1);
          } else if (event.key === "2") {
            increase(2);
          } else if (event.key === "w" || event.key === "ц") {
            decrease(2);
          } else if (event.key === "3") {
            increase(3);
          } else if (event.key === "e" || event.key === "у") {
            decrease(3);
          }
        } else if (typeof cat === "number") {
          if (event.key === "1" && cat === 1) {
            increase(1);
          } else if ((event.key === "q" || event.key === "й") && cat === 1) {
            decrease(1);
          } else if (event.key === "2" && cat === 2) {
            increase(2);
          } else if ((event.key === "w" || event.key === "ц") && cat === 2) {
            decrease(2);
          } else if (event.key === "3" && cat === 3) {
            increase(3);
          } else if ((event.key === "e" || event.key === "у") && cat === 3) {
            decrease(3);
          }
        }
      } else if (boardCondition === "question" && final !== false) {
        if (event.key === "=") {
          setBoardCondition("finalAnswer");
        }
      } else if (boardCondition === "answer") {
        if (cat === false) {
          if (event.key === "Backspace") {
            noAnswer();
          } else if (event.key === "1") {
            increase(1);
          } else if (event.key === "q" || event.key === "й") {
            decrease(1);
          } else if (event.key === "2") {
            increase(2);
          } else if (event.key === "w" || event.key === "ц") {
            decrease(2);
          } else if (event.key === "3") {
            increase(3);
          } else if (event.key === "e" || event.key === "у") {
            decrease(3);
          }
        } else if (typeof cat === "number") {
          if (event.key === "Backspace") {
            decrease(1);
          } else if (event.key === "1" && cat === 1) {
            increase(1);
          } else if ((event.key === "q" || event.key === "й") && cat === 1) {
            decrease(1);
          } else if (event.key === "2" && cat === 2) {
            increase(2);
          } else if ((event.key === "w" || event.key === "ц") && cat === 2) {
            decrease(2);
          } else if (event.key === "3" && cat === 3) {
            increase(3);
          } else if ((event.key === "e" || event.key === "у") && cat === 3) {
            decrease(3);
          }
        }
      } else if (boardCondition === "cat") {
        if (event.key === "1") {
          setCat(1);
          setBoardCondition("question");
        } else if (event.key === "2") {
          setCat(2);
          setBoardCondition("question");
        } else if (event.key === "3") {
          setCat(3);
          setBoardCondition("question");
        }
      }
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      else if (boardCondition === "table") {
        if (event.key === "±") {
          setBoardCondition("final");
          setFinalCondition([1, 1, 0, 0, 0, 0, 0]);
        } else if (event.key === "/") {
          setButtonCondition([
            ["sleep", "sleep", "sleep", "sleep", "sleep", "sleep", "sleep"],
            ["sleep", "sleep", "sleep", "sleep", "sleep", "sleep", "sleep"],
            ["sleep", "sleep", "sleep", "sleep", "sleep", "sleep", "sleep"],
            ["sleep", "sleep", "sleep", "sleep", "sleep", "sleep", "sleep"],
            ["sleep", "sleep", "sleep", "sleep", "sleep", "sleep", "sleep"],
            ["sleep", "sleep", "sleep", "sleep", "sleep", "sleep", 9000],
          ]);
        }
      }
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
    document.addEventListener("keydown", keyboard);
    return () => {
      document.removeEventListener("keydown", keyboard);
      keyboard;
    };
  }, [boardCondition, score, allDoneAreNumber, teams, cat]);

  function isQuestionsOver() {
    return buttonCondition
      .map((arr) => arr.every((e) => e === "sleep"))
      .every((e) => e === true);
  }

  function increase(num) {
    typeof cat === "number" ? (num = cat) : 0;
    if (bet > 0) {
      setButtonClicked((prev) => ({ ...prev, [num]: "green" }));
    }
    setPlayIndex(8);
    setScore({
      ...score,
      ["score" + num]: score["score" + num] + bet,
    });

    setBet(0);
    setTimeout(() => setButtonClicked((prev) => ({ 1: 0, 2: 0, 3: 0 })), 1000);
    setBoardCondition(isQuestionsOver() ? "results" : "table");
    setCat(false);
  }

  function decrease(num) {
    typeof cat === "number" ? (num = cat) : 0;
    if (bet > 0) {
      setButtonClicked((prev) => ({ ...prev, [num]: "red" }));
    }
    setPlayIndex(6);
    setScore({ ...score, ["score" + num]: score["score" + num] - bet });

    typeof cat === "number" ? setBet(0) : 0;
    setTimeout(() => setButtonClicked((prev) => ({ 1: 0, 2: 0, 3: 0 })), 1000);
    typeof cat === "number"
      ? setBoardCondition(isQuestionsOver() ? "results" : "table")
      : 0;
    setCat(false);
  }

  function noAnswer() {
    setBet(0);
    setPlayIndex(7);
    setBoardCondition(isQuestionsOver() ? "results" : "table");
  }

  function ifItsCat() {
    actualRound[questionXY[0]].line[questionXY[1]].cat
      ? setBoardCondition("cat")
      : setBoardCondition("question");
  }

  function defaultTeamNames() {
    if (teams.team1 === "") {
      setTeams((t) => {
        return { ...t, team1: "Команда № 1" };
      });
    }
    if (teams.team2 === "") {
      setTeams((t) => {
        return { ...t, team2: "Команда № 2" };
      });
    }
    if (teams.team3 === "") {
      setTeams((t) => {
        return { ...t, team3: "Команда № 3" };
      });
    }
  }

  function finalScore() {
    let FS1 = score.score1 + done.D1;
    let FS2 = score.score2 + done.D2;
    let FS3 = score.score3 + done.D3;
    let arr = [
      [FS1, teams.team1],
      [FS2, teams.team2],
      [FS3, teams.team3],
    ];
    arr.sort((a, b) => b[0] - a[0]);
    setEnd(arr);
  }

  useEffect(() => {
    setActualRound(
      roundN !== "final"
        ? [...allRoundQuetions[roundN]]
        : [...allRoundQuetions[0]]
    );

    setButtonCondition(
      Array(6).fill([
        (roundN + 1) * 1 * 100,
        (roundN + 1) * 2 * 100,
        (roundN + 1) * 3 * 100,
        (roundN + 1) * 4 * 100,
        (roundN + 1) * 5 * 100,
        (roundN + 1) * 6 * 100,
        (roundN + 1) * 7 * 100,
      ])
    );

    return () => {};
  }, [roundN]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // useEffect(() => {
  //   console.log(boardCondition, done, bet, cat);
  // }, [boardCondition, done, bet, cat]);
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      {
        <>
          <div className="FAQ" onClick={() => setModal((m) => !m)}>
            ?
          </div>
          <ModalSection
            buttonVisibility={buttonVisibility}
            setButtonVisibility={setButtonVisibility}
            setModal={setModal}
            open={modal}
          />
        </>
      }
      {boardCondition === "start" && (
        <>
          <StartSection
            buttonVisibility={buttonVisibility}
            setBoardCondition={setBoardCondition}
            setPlayIndex={setPlayIndex}
          ></StartSection>
        </>
      )}
      {boardCondition === "registration" && (
        <>
          <RegistrationSection
            teams={teams}
            setTeams={setTeams}
            buttonVisibility={buttonVisibility}
            setBoardCondition={setBoardCondition}
            setButtonVisibility={setButtonVisibility}
            defaultTeamNames={defaultTeamNames}
          ></RegistrationSection>
        </>
      )}
      {boardCondition === "tableAd" && (
        <>
          <AdSection
            setBoardCondition={setBoardCondition}
            boardCondition={boardCondition}
            buttonVisibility={buttonVisibility}
            setPlayIndex={setPlayIndex}
          >
            {`Раунд № ${roundN + 1}`}
          </AdSection>
        </>
      )}
      {boardCondition === "table" && (
        <>
          <ScoreSection
            teams={teams}
            score={score}
            buttonClicked={buttonClicked}
            increase={bet === 0 ? () => {} : increase}
            decrease={bet === 0 ? () => {} : decrease}
            buttonVisibility={buttonVisibility}
          ></ScoreSection>
          {actualRound.map((_, i) => (
            <LineSection
              setBoardCondition={setBoardCondition}
              buttonCondition={buttonCondition}
              setButtonCondition={setButtonCondition}
              setBet={setBet}
              setQuestionXY={setQuestionXY}
              lineN={i}
              key={i}
              ifItsCat={ifItsCat}
            >
              {actualRound[i].theme}
            </LineSection>
          ))}
        </>
      )}
      {boardCondition === "cat" && (
        <>
          <ScoreSection
            teams={teams}
            score={score}
            buttonClicked={buttonClicked}
            increase={() => {}}
            decrease={() => {}}
            buttonVisibility={buttonVisibility}
          ></ScoreSection>
          <CatAdSection
            setBoardCondition={setBoardCondition}
            buttonVisibility={buttonVisibility}
            setPlayIndex={setPlayIndex}
            setCat={setCat}
            teams={teams}
          ></CatAdSection>
        </>
      )}
      {boardCondition === "question" && (
        <>
          <ScoreSection
            teams={teams}
            score={score}
            buttonClicked={buttonClicked}
            increase={cat === false ? increase : () => {}}
            decrease={cat === false ? decrease : () => {}}
            buttonVisibility={final !== false ? false : buttonVisibility}
          ></ScoreSection>
          <QuestionSection
            buttonVisibility={buttonVisibility}
            setBoardCondition={setBoardCondition}
            typeOfQuestion={
              typeof final === "number"
                ? finalQuestions[final].typeOfQuestion
                : actualRound[questionXY[0]].line[questionXY[1]].typeOfQuestion
            }
            question={
              typeof final === "number"
                ? finalQuestions[final].question
                : actualRound[questionXY[0]].line[questionXY[1]].question
            }
            linkQ={
              typeof final === "number"
                ? finalQuestions[final].linkQ
                : actualRound[questionXY[0]].line[questionXY[1]].linkQ
            }
            playAnswerAudioPicture={playAnswerAudioPicture}
            setPlayAnswerAudioPicture={setPlayAnswerAudioPicture}
            final={final}
            music={setPlayIndex}
          ></QuestionSection>
        </>
      )}
      {boardCondition === "answer" && (
        <>
          <ScoreSection
            teams={teams}
            score={score}
            buttonClicked={buttonClicked}
            increase={cat === false ? increase : () => {}}
            decrease={cat === false ? decrease : () => {}}
            buttonVisibility={buttonVisibility}
          ></ScoreSection>
          <AnswerSection
            buttonVisibility={buttonVisibility}
            noAnswer={noAnswer}
            typeOfAnswer={
              actualRound[questionXY[0]].line[questionXY[1]].typeOfAnswer
            }
            answer={actualRound[questionXY[0]].line[questionXY[1]].answer}
            linkA={actualRound[questionXY[0]].line[questionXY[1]].linkA}
            cat={cat}
            increase={increase}
            decrease={decrease}
          ></AnswerSection>
        </>
      )}
      {boardCondition === "results" && (
        <>
          <ResultSection
            teams={teams}
            score={score}
            roundN={roundN}
            setRoundN={setRoundN}
            qtyOfRounds={qtyOfRounds}
            setActualRound={setActualRound}
            setButtonCondition={setButtonCondition}
            setBoardCondition={setBoardCondition}
            buttonVisibility={buttonVisibility}
            setPlayIndex={setPlayIndex}
          />
        </>
      )}
      {boardCondition === "finalAd" && (
        <>
          <AdSection
            setBoardCondition={setBoardCondition}
            boardCondition={boardCondition}
            buttonVisibility={buttonVisibility}
            setPlayIndex={setPlayIndex}
          >
            {"Финал"}
          </AdSection>
        </>
      )}
      {boardCondition === "final" && (
        <>
          <ScoreSection
            teams={teams}
            score={score}
            buttonClicked={buttonClicked}
            buttonVisibility={false}
          ></ScoreSection>
          <FinalSection
            finalQuestions={finalQuestions}
            finalCondition={finalCondition}
            setFinalCondition={setFinalCondition}
            setBoardCondition={setBoardCondition}
            setButtonVisibility={setButtonVisibility}
            setFinal={setFinal}
          ></FinalSection>
        </>
      )}
      {boardCondition === "finalAnswer" && (
        <>
          <ScoreSection
            teams={teams}
            score={score}
            buttonClicked={buttonClicked}
            buttonVisibility={false}
            final={final}
          ></ScoreSection>
          <FinalAnswerSection
            buttonVisibility={buttonVisibility}
            typeOfAnswer={finalQuestions[final].typeOfAnswer}
            answer={finalQuestions[final].answer}
            linkA={finalQuestions[final].linkA}
            FBS={FBS}
            setFBS={setFBS}
            done={done}
            setDone={setDone}
            allDoneAreNumber={allDoneAreNumber}
            setBoardCondition={setBoardCondition}
            score={score}
            finalScore={finalScore}
          ></FinalAnswerSection>
        </>
      )}
      {boardCondition === "end" && (
        <>
          <AdSection
            setBoardCondition={setBoardCondition}
            boardCondition={boardCondition}
            buttonVisibility={buttonVisibility}
            setPlayIndex={setPlayIndex}
            end={end}
            finalScore={finalScore}
          >
            {"Финал"}
          </AdSection>
        </>
      )}
    </>
  );
}
