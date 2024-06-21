import Button from "/src/components/Button/Button.jsx";
import classes from "/src/components/CatAdSection/CatAdSection.module.css";
import { useEffect } from "react";

export default function CatAdSection({
  setBoardCondition,
  buttonVisibility,
  setPlayIndex,
}) {
  useEffect(() => {
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
            <Button
              onClick={() => {
                setBoardCondition("question");
              }}
            >
              К вопросу
            </Button>
          </>
        )}
      </div>
    </>
  );
}
