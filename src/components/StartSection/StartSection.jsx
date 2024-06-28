import Button from "/src/components/Button/Button.jsx";
import classes from "/src/components/StartSection/StartSection.module.css";
import { useState, useEffect } from "react";

export default function StartSection({
  setBoardCondition,
  buttonVisibility,
  setPlayIndex,
  loadingPercent,
}) {
  let [loading, setLoading] = useState("Загрузка ");
  useEffect(() => {
    setTimeout(() => {
      if (loading === "Загрузка ") {
        setLoading("Загрузка. ");
      } else if (loading === "Загрузка. ") {
        setLoading("Загрузка.. ");
      } else if (loading === "Загрузка.. ") {
        setLoading("Загрузка... ");
      } else if (loading === "Загрузка... ") {
        setLoading("Загрузка ");
      }
    }, 1000);
  }, [loading]);
  return (
    <>
      <p className={`${classes.disappear} ${classes.absoluteText}`}>
        {loadingPercent < 100 ? loading : "Загрузка "}
        {loadingPercent < 100 ? `${loadingPercent}%` : ""}
      </p>
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
