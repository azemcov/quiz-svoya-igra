import { useState } from "react";
import Line from "/src/components/Line/Line.jsx";
import Score from "./components/Score/Score";
import { round1Questions } from "/data.js";
import "./App.css";

function App() {
  let team1 = "комманда 1 eeeeeeeeeeeeefdjogjdofjgi";
  let team2 = "комманда 2 eeeeeeeeeeeeefdjogjdofjgi";
  let team3 = "комманда 3 eeeeeeeeeeeeefdjogjdofjgi";
  let score1 = 1000;
  let score2 = 2000;
  let score3 = 3000;

  return (
    <>
      <Score
        team1={team1}
        team2={team2}
        team3={team3}
        score1={score1}
        score2={score2}
        score3={score3}
      ></Score>
      {round1Questions.map((_, i) => (
        <Line lineN={i}>{round1Questions[i].theme}</Line>
      ))}
    </>
  );
}

export default App;
