import Button from "/src/components/Button/Button.jsx";
import classes from "/src/components/RegistrationSection/RegistrationSection.module.css";

export default function RegistrationSection({
  teams,
  setTeams,
  setBoardCondition,
  buttonVisibility,
  inputBlink,
  setInputBlink,
}) {
  return (
    <>
      <div className={classes.result}>
        <div>
          <img src="/public/logo.svg" alt="Logo" className={classes.image} />
          <div>
            <p>Названия команд</p>
          </div>
          <div>
            <input
              className={`${classes.inputText} ${
                inputBlink[0] ? classes.alert : ""
              }`}
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
          <div>
            <input
              className={`${classes.inputText} ${
                inputBlink[1] ? classes.alert : ""
              }`}
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
          <div>
            <input
              className={`${classes.inputText} ${
                inputBlink[2] ? classes.alert : ""
              }`}
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
                if (
                  teams.team1.trim() !== "" &&
                  teams.team2.trim() !== "" &&
                  teams.team3.trim() !== ""
                ) {
                  setBoardCondition("tableAd");
                } else {
                  setInputBlink([
                    teams.team1.trim() === "" ? 1 : 0,
                    teams.team2.trim() === "" ? 1 : 0,
                    teams.team3.trim() === "" ? 1 : 0,
                  ]);
                  setTimeout(() => {
                    setInputBlink([0, 0, 0]);
                  }, 1000);
                }
              }}
            >
              Начать игру
            </Button>
          </>
        )}
      </div>
    </>
  );
}
