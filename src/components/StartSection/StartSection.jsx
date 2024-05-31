import Button from "/src/components/Button/Button.jsx";
import classes from "/src/components/ResultSection/ResultSection.module.css";
import { allRoundQuetions } from "/data.js";

export default function ResultSection({
  setTeams,
  setBoardCondition,
  buttonVisibility,
}) {
  return (
    <>
      <div className={classes.result}>
        <div className={classes.center}>
          <div>
            <p>Названия команд</p>
          </div>
          <div className={classes.result}>
            <div className={classes.teams}>
              <p className={classes.text}>название1</p>
            </div>
            <div className={classes.teams}>
              <p className={classes.text}>название2</p>
            </div>
            <div className={classes.teams}>
              <p className={classes.text}>название3</p>
            </div>
          </div>
          {buttonVisibility && (
            <>
              <Button
                onClick={() => {
                  setTeams({
                    team1: "команда 1",
                    team2: "команда 2",
                    team3: "команда 3",
                  });
                  setBoardCondition("tableAd");
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
