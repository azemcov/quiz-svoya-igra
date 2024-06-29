import Button from "/src/components/Button/Button.jsx";
import classes from "/src/components/StartSection/StartSection.module.css";
import { useState, useEffect } from "react";

export default function StartSection({
  setBoardCondition,
  buttonVisibility,
  setPlayIndex,
  loadingPercent,
}) {
  let [loading, setLoading] = useState("");
  useEffect(() => {
    let timer;
    if (!(loadingPercent < 100)) {
      setLoading(null);
    }
    timer = setTimeout(() => {
      setLoading((l) => {
        switch (l) {
          case "":
            return ".";
          case ".":
            return "..";
          case "..":
            return "...";
          case "...":
            return "";
        }
      });
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [loading]);
  return (
    <>
      <p
        className={`${loadingPercent < 100 ? "" : classes.disappear} ${
          classes.absoluteText
        }`}
      >
        {loadingPercent < 100 ? "Загрузка " : "Загрузка "}
        {loadingPercent < 100 ? `${loadingPercent}%` : "100%"}
      </p>
      <p
        className={`${loadingPercent < 100 ? "" : classes.disappear} ${
          classes.absoluteText2
        }`}
      >
        {loading}
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
