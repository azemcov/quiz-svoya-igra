import { Children } from "react";
import classes from "/src/components/QuestionButton/QuestionButton.module.css";

export default function QuestionButton({ children, ...props }) {
  return (
    <button {...props} className={classes.normalButton}>
      {children}
    </button>
  );
}
