import SButton from "../../SButton/SButton";
import TeamNameAndCrore from "/src/components/TeamNameAndCrore/TeamNameAndCrore.jsx";
import classes from "/src/components/Score/Score.module.css";

export default function Score({ ...props }) {
  return (
    <>
      <div className={classes.score}>
        <SButton>-</SButton>
        <TeamNameAndCrore name={props.team1} score={props.score1} />
        <SButton>+</SButton>
        <div style={{ width: "1vw" }}></div>
        <SButton>-</SButton>
        <TeamNameAndCrore name={props.team2} score={props.score2} />
        <SButton>+</SButton>
        <div style={{ width: "1vw" }}></div>
        <SButton>-</SButton>
        <TeamNameAndCrore name={props.team3} score={props.score3} />
        <SButton>+</SButton>
      </div>
    </>
  );
}
