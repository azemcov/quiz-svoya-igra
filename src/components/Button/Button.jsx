import classes from "@components/Button/Button.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ScoreButton({ children, ...props }) {
  return (
    <button {...props} className={classes.score_button}>
      {children}
    </button>
  );
}
