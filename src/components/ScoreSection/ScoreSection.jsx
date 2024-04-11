import { useState } from "react";
import SButton from "/src/components/ScoreButton/ScoreButton.jsx";
import TeamNameAndCrore from "/src/components/TeamNameAndScore/TeamNameAndScore.jsx";
import classes from "/src/components/ScoreSection/ScoreSection.module.css";

export default function ScoreSection({
  teams,
  score,
  setScore,
  bet,
  setBet,
  setBoardCondition,
}) {
  function increase(num) {
    setScore({
      ...score,
      ["score" + num]: score["score" + num] + bet,
    });
    setBet(0);
    setBoardCondition("table");
  }
  function decrease(num) {
    setScore({ ...score, ["score" + num]: score["score" + num] - bet });
  }
  return (
    <>
      <div className={classes.score}>
        <SButton onClick={() => decrease("1")}>-</SButton>
        <TeamNameAndCrore name={teams.team1} score={score.score1} />
        <SButton onClick={() => increase("1")}>+</SButton>
        <div style={{ width: "1vw" }}></div>
        <SButton onClick={() => decrease("2")}>-</SButton>
        <TeamNameAndCrore name={teams.team2} score={score.score2} />
        <SButton onClick={() => increase("2")}>+</SButton>
        <div style={{ width: "1vw" }}></div>
        <SButton onClick={() => decrease("3")}>-</SButton>
        <TeamNameAndCrore name={teams.team3} score={score.score3} />
        <SButton onClick={() => increase("3")}>+</SButton>
      </div>
    </>
  );
}
