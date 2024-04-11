import classes from "/src/components/QuestionSection/QuestionSection.module.css";

export default function QuestionSection({ children }) {
  return <p className={classes.question}>{children}</p>;
}
