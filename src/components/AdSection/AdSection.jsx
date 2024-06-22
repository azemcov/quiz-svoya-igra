import Button from "/src/components/Button/Button.jsx";
import classes from "/src/components/AdSection/AdSection.module.css";
import { useEffect } from "react";

export default function AdSection({
  boardCondition,
  setBoardCondition,
  buttonVisibility,
  children,
  setPlayIndex,
}) {
  useEffect(() => {
    boardCondition === "end" ? setPlayIndex(5) : 0;
  }, []);

  return (
    <>
      <div className={classes.result}>
        <div className={classes.center}>
          {boardCondition === "end" && (
            <>
              <img src={"/public/win.png"} alt="win!" />
            </>
          )}
          <div>
            <p className={classes.text}>{children}</p>
          </div>
          {buttonVisibility && boardCondition !== "end" && (
            <Button
              onClick={() => {
                setBoardCondition(
                  boardCondition === "tableAd"
                    ? "table"
                    : boardCondition === "finalAd"
                    ? "final"
                    : 0
                );
                setPlayIndex(1);
              }}
            >
              Начать
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
