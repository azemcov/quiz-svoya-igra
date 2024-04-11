import { useState, useEffect } from "react";
import LineSection from "/src/components/LineSection/LineSection.jsx";
import ScoreSection from "/src/components/ScoreSection/ScoreSection.jsx";
import QuestionSection from "/src/components/QuestionSection/QuestionSection.jsx";
import { allRoundQuetions } from "/data.js";
import "./App.css";

function App({ keydown }) {
  let [roundN, setRoundN] = useState(0);
  let [actualRound, setActualRound] = useState([...allRoundQuetions[roundN]]);
  let [actualFinal, setActualFinal] = useState();
  let [boardCondition, setBoardCondition] = useState("table");
  let [buttonCondition, setButtonCondition] = useState(
    Array(6).fill([100, 200, 300, 400, 500, 600, 700])
  );
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

  useEffect(() => {
    function keyboard(event) {
      if (event.code === "KeyN") {
        setBoardCondition("table");
      } else {
        console.log(event.code);
      }
    }
    document.addEventListener("keydown", keyboard);
    return () => {
      document.removeEventListener("keydown", keyboard);
    };
  }, []);

  return (
    <>
      <ScoreSection
        teams={teams}
        score={score}
        setScore={setScore}
        bet={bet}
        setBet={setBet}
        setBoardCondition={setBoardCondition}
      ></ScoreSection>
      {boardCondition === "table" && (
        <>
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
          <QuestionSection>
            {actualRound[questionXY[0]].line[questionXY[1]].question}
          </QuestionSection>
        </>
      )}
    </>
  );
}

export default App;
