import Button from "/src/components/Button/Button.jsx";
import classes from "/src/components/SettingsSection/SettingsSection.module.css";

export default function SettingsSection({
  buttonVisibility,
  setButtonVisibility,
  setBoardCondition,
}) {
  return (
    <>
      <div className={classes.settings}>
        <div>
          <div>
            <p>Настройки</p>
          </div>
          <div>
            <input
              className={classes.checkbox}
              type="checkbox"
              checked={buttonVisibility}
              onChange={() => setButtonVisibility((bv) => !bv)}
            />
            Показывать кнопки
          </div>
          <br />
        </div>
        {buttonVisibility && (
          <>
            <Button
              onClick={() => {
                setBoardCondition("registration");
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
