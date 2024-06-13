import Button from "/src/components/Button/Button.jsx";
import classes from "/src/components/StartRegistrationSection/StartRegistrationSection.module.css";

export default function StartRegistrationSection({
  teams,
  setTeams,
  setBoardCondition,
  buttonVisibility,
}) {
  return (
    <>
      <div className={classes.result}>
        <div>
          <img src="/public/logo.svg" alt="Logo" className={classes.image} />
          <div>
            <p>Названия команд</p>
          </div>
          <div className={classes.teams}>
            <input
              className={classes.inputText}
              type="text"
              defaultValue={teams.team1}
              placeholder="Название команды № 1"
              onChange={(e) =>
                setTeams({
                  ...teams,
                  team1: e.target.value,
                })
              }
            />
          </div>
          <div className={classes.teams}>
            <input
              className={classes.inputText}
              type="text"
              defaultValue={teams.team2}
              placeholder="Название команды № 2"
              onChange={(e) =>
                setTeams({
                  ...teams,
                  team2: e.target.value,
                })
              }
            />
          </div>
          <div className={classes.teams}>
            <input
              className={classes.inputText}
              type="text"
              defaultValue={teams.team3}
              placeholder="Название команды № 3"
              onChange={(e) =>
                setTeams({
                  ...teams,
                  team3: e.target.value,
                })
              }
            />
          </div>
          <br />
        </div>
        {buttonVisibility && (
          <>
            <Button
              onClick={() => {
                setBoardCondition("tableAd");
              }}
            >
              ok
            </Button>
          </>
        )}
      </div>
    </>
  );
}
