import classes from "/src/components/ScoreButton/ScoreButton.module.css";

export default function ScoreButton({ children, ...props }) {
  return (
    <button {...props} className={classes.score_button}>
      {children}
    </button>
  );
}
