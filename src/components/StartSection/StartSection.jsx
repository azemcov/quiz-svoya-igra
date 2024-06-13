import Button from "/src/components/Button/Button.jsx";
import classes from "/src/components/StartSection/StartSection.module.css";

export default function StartSection({ setBoardCondition, buttonVisibility }) {
  return (
    <>
      <div className={classes.result}>
        <div className={classes.center}>
          <div>
            <img src="/public/logo.svg" alt="Logo" className={classes.image} />
          </div>
          {buttonVisibility && (
            <>
              <br />
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
