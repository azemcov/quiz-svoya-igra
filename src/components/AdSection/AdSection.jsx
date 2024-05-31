import Button from "/src/components/Button/Button.jsx";
import classes from "/src/components/AdSection/AdSection.module.css";

export default function AdSection({
  boardCondition,
  setBoardCondition,
  buttonVisibility,
  children,
}) {
  return (
    <>
      <div className={classes.result}>
        <div className={classes.center}>
          <div>
            <p className={classes.text}>{children}</p>
          </div>
          {buttonVisibility && (
            <Button
              onClick={() =>
                setBoardCondition(
                  boardCondition === "tableAd"
                    ? "table"
                    : boardCondition === "finalAd"
                    ? "final"
                    : 0
                )
              }
            >
              Начать
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
