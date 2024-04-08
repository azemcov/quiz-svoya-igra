import classes from "/src/components/TeamNameAndCrore/TeamNameAndCrore.module.css";

export default function TeamNameAndCrore({ name, score }) {
  return (
    <div className={classes.command}>
      <p className={classes.text}>{name}</p>
      <p className={classes.points}>{score}</p>
    </div>
  );
}
