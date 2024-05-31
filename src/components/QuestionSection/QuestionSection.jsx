import Button from "/src/components/Button/Button.jsx";
import classes from "/src/components/QuestionSection/QuestionSection.module.css";

export default function QuestionSection({
  children,
  buttonVisibility,
  noAnswer,
}) {
  return (
    <>
      <div className={classes.question}>
        <p>{children}</p>
        {buttonVisibility && (
          <Button onClick={() => noAnswer()}>Нет верного ответа</Button>
        )}
      </div>
    </>
  );
}
