import { useState, useEffect } from "react";
import LineSection from "/src/components/LineSection/LineSection.jsx";
import ScoreSection from "/src/components/ScoreSection/ScoreSection.jsx";
import QuestionSection from "/src/components/QuestionSection/QuestionSection.jsx";
import ResultSection from "/src/components/ResultSection/ResultSection.jsx";
import FinalSection from "/src/components/FinalSection/FinalSection.jsx";
import { allRoundQuetions, finalQuestions } from "/data.js";
import "./App.css";
import AdSection from "./components/AdSection/AdSection";
import StartSection from "/src/components/StartSection/StartSection.jsx";
import StartRegistrationSection from "./components/StartRegistrationSection/StartRegistrationSection";

function App() {
  let [roundN, setRoundN] = useState(0);
  let [qtyOfRounds, setQtyOfRounds] = useState(allRoundQuetions.length);
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
    team1: "команда 1",
    team2: "команда 2",
    team3: "команда 3",
  });
  let [score, setScore] = useState({
    score1: 1100,
    score2: 2200,
    score3: 3300,
  });
  let [questionXY, setQuestionXY] = useState([0, 0]);
  let [buttonClicked, setButtonClicked] = useState({ 1: 0, 2: 0, 3: 0 });
  let [buttonVisibility, setButtonVisibility] = useState(false);
  let [final, setFinal] = useState(false);

  useEffect(() => {
    function keyboard(event) {
      if (event.key === "!" && boardCondition === "question" && bet !== 0) {
        decrease(1);
      } else if (event.code === "KeyQ" && boardCondition === "table") {
        setButtonCondition([
          ["sleep", "sleep", "sleep", "sleep", "sleep", "sleep", "sleep"],
          ["sleep", "sleep", "sleep", "sleep", "sleep", "sleep", "sleep"],
          ["sleep", "sleep", "sleep", "sleep", "sleep", "sleep", "sleep"],
          ["sleep", "sleep", "sleep", "sleep", "sleep", "sleep", "sleep"],
          ["sleep", "sleep", "sleep", "sleep", "sleep", "sleep", "sleep"],
          ["sleep", "sleep", "sleep", "sleep", "sleep", "sleep", 7000],
        ]);
      } else if (event.code === "Enter" && boardCondition === "start") {
        setBoardCondition("registration");
      } else if (event.code === "Enter" && boardCondition === "registration") {
        setBoardCondition("tableAd");
      } else if (event.code === "KeyR") {
        setBoardCondition("results");
      } else if (event.code === "KeyF") {
        setBoardCondition("final");
      } else if (event.code === "KeyT") {
        setBoardCondition("table");
      } else if (event.code === "KeyV") {
        setButtonVisibility((prev) => !prev);
      } else if (event.code === "Digit0") {
        setButtonVisibility(console.log("текущий раунд:", roundN));
      } else {
        console.log(event.code);
      }
    }
    document.addEventListener("keydown", keyboard);
    return () => {
      document.removeEventListener("keydown", keyboard);
      keyboard;
    };
  }, []);

  function isQuestionsOver() {
    return buttonCondition
      .map((arr) => arr.every((e) => e === "sleep"))
      .every((e) => e === true);
  }

  function increase(num) {
    if (bet > 0) {
      setButtonClicked({ ...buttonClicked, [num]: "green" });
    }
    setScore({
      ...score,
      ["score" + num]: score["score" + num] + bet,
    });
    setBet(0);
    setTimeout(() => setButtonClicked({ 1: 0, 2: 0, 3: 0 }), 1000);
    setBoardCondition(isQuestionsOver() ? "results" : "table");
  }
  function decrease(num) {
    if (bet > 0) {
      setButtonClicked({ ...buttonClicked, [num]: "red" });
    }
    setScore({ ...score, ["score" + num]: score["score" + num] - bet });
    setTimeout(() => setButtonClicked({ 1: 0, 2: 0, 3: 0 }), 1000);
  }
  function noAnswer() {
    setBoardCondition(isQuestionsOver() ? "results" : "table");
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

  return (
    <>
      {boardCondition === "start" && (
        <>
          <StartSection
            buttonVisibility={buttonVisibility}
            setBoardCondition={setBoardCondition}
          ></StartSection>
        </>
      )}
      {boardCondition === "registration" && (
        <>
          <StartRegistrationSection
            teams={teams}
            setTeams={setTeams}
            buttonVisibility={buttonVisibility}
            setBoardCondition={setBoardCondition}
          ></StartRegistrationSection>
        </>
      )}
      {boardCondition === "tableAd" && (
        <>
          <AdSection
            setBoardCondition={setBoardCondition}
            boardCondition={boardCondition}
            buttonVisibility={buttonVisibility}
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
            increase={increase}
            decrease={decrease}
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
            >
              {actualRound[i].theme}
            </LineSection>
          ))}
        </>
      )}
      {boardCondition === "question" && (
        <>
          <ScoreSection
            teams={teams}
            score={score}
            buttonClicked={buttonClicked}
            increase={increase}
            decrease={decrease}
            buttonVisibility={buttonVisibility}
          ></ScoreSection>
          <QuestionSection
            buttonVisibility={buttonVisibility}
            noAnswer={noAnswer}
          >
            {typeof final === "number"
              ? finalQuestions[final].question
              : actualRound[questionXY[0]].line[questionXY[1]].question}
          </QuestionSection>
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
          />
        </>
      )}
      {boardCondition === "finalAd" && (
        <>
          <AdSection
            setBoardCondition={setBoardCondition}
            boardCondition={boardCondition}
            buttonVisibility={buttonVisibility}
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
    </>
  );
}

export default App;
