import classes from "/src/SButton/SButton.module.css";

export default function ({ children }) {
  return <button className={classes.score_button}>{children}</button>;
}
