import classes from "/src/components/TeamNameAndScore/TeamNameAndScore.module.css";

export default function TeamNameAndCrore({ name, score }) {
  return (
    <div className={classes.command}>
      <p className={classes.text}>{name}</p>
      <p className={classes.points}>{score}</p>
    </div>
  );
}
