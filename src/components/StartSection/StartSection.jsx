import Button from "/src/components/Button/Button.jsx";
import classes from "/src/components/StartSection/StartSection.module.css";

export default function StartSection({
  setBoardCondition,
  buttonVisibility,
  setPlayIndex,
}) {
  return (
    <>
      <div className={classes.result}>
        <div className={classes.center}>
          <div
            onClick={() => {
              setBoardCondition("registration");
              setPlayIndex(0);
            }}
          >
            <img src="/public/logo.svg" alt="Logo" className={classes.image} />
          </div>
          {buttonVisibility && (
            <>
              <br />
              <Button
                onClick={() => {
                  setBoardCondition("registration");
                  setPlayIndex(0);
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
