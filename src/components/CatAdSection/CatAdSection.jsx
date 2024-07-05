import Button from "@components/Button/Button.jsx";
import classes from "@components/CatAdSection/CatAdSection.module.css";
import bagImage from "@images/bag.png";
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
        <img className={classes.image} src={bagImage} alt="pig in a poke" />
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
