import Button from "/src/components/Button/Button.jsx";
import classes from "/src/components/CatAdSection/CatAdSection.module.css";
import { useEffect } from "react";

export default function CatAdSection({
  setBoardCondition,
  buttonVisibility,
  setPlayIndex,
  setCat,
  teams,
}) {
  useEffect(() => {
    setCat(true);
    setTimeout(() => setPlayIndex(9), 100);
  }, []);
  return (
    <>
      <div className={classes.question}>
        <p>Кот в мешке</p>
        <img
          className={classes.image}
          src="/public/bag.png"
          alt="pig in a poke"
        />
        {buttonVisibility && (
          <>
            <div className={classes.center}>
              <Button
                style={{ margin: "10px" }}
                onClick={() => {
                  setCat(1);
                  setBoardCondition("question");
                }}
              >
                {teams.team1}
              </Button>
              <Button
                style={{ margin: "10px" }}
                onClick={() => {
                  setCat(2);
                  setBoardCondition("question");
                }}
              >
                {teams.team2}
              </Button>
              <Button
                style={{ margin: "10px" }}
                onClick={() => {
                  setCat(3);
                  setBoardCondition("question");
                }}
              >
                {teams.team3}
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
