import classes from "@components/TeamNameAndScore/TeamNameAndScore.module.css";

export default function TeamNameAndCrore({ name, score, buttonClicked, bet }) {
  return (
    <div className={classes.command}>
      <p className={classes.text}>{name}</p>
      <p
        className={`${classes.points} ${
          buttonClicked === "red"
            ? classes.redBlink
            : buttonClicked === "green"
            ? classes.greenBlink
            : ""
        }`}
      >
        {score}
      </p>
    </div>
  );
}
