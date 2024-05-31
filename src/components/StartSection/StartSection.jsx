import Button from "/src/components/Button/Button.jsx";
import classes from "/src/components/StartSection/StartSection.module.css";

export default function StartSection({ setBoardCondition, buttonVisibility }) {
  return (
    <>
      <div className={classes.result}>
        <div className={classes.center}>
          <div>
            <p>Стартовое лого</p>
          </div>
          {buttonVisibility && (
            <>
              <Button
                onClick={() => {
                  setBoardCondition("registration");
                }}
              >
                Старт
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
