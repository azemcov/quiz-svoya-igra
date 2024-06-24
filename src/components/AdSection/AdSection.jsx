import Button from "/src/components/Button/Button.jsx";
import classes from "/src/components/AdSection/AdSection.module.css";
import { useEffect } from "react";

export default function AdSection({
  boardCondition,
  setBoardCondition,
  buttonVisibility,
  children,
  setPlayIndex,
  end,
  finalScore,
}) {
  useEffect(() => {
    boardCondition === "end"
      ? (setPlayIndex(5), setTimeout(() => setPlayIndex(5), 1), finalScore())
      : (setPlayIndex(3), setTimeout(() => setPlayIndex(3), 1));
  }, []);

  return (
    <>
      <div className={classes.result}>
        <div className={classes.center}>
          {boardCondition === "end" && (
            <>
              <img
                className={classes.image}
                src={"/public/win.png"}
                alt="win!"
              />
            </>
          )}
          {boardCondition !== "end" && (
            <div>
              <p className={classes.text}>{children}</p>
            </div>
          )}
          {boardCondition === "end" && (
            <div>
              <p>
                {end[0][0]} {end[0][1]}
              </p>
              <p>
                {end[1][0]} {end[1][1]}
              </p>
              <p>
                {end[2][0]} {end[2][1]}
              </p>
            </div>
          )}
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
                setTimeout(() => setPlayIndex(1), 1);
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
