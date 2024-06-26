import Button from "/src/components/Button/Button.jsx";
import TeamNameAndSrore from "/src/components/TeamNameAndScore/TeamNameAndScore.jsx";
import classes from "/src/components/ScoreSection/ScoreSection.module.css";

export default function ScoreSection({
  teams,
  score,
  buttonClicked,
  increase,
  decrease,
  buttonVisibility,
}) {
  return (
    <div className={classes.score}>
      {Array.from({ length: 3 }).map((m, i) => (
        <div key={i} style={{ display: "flex", margin: "0 0.2rem" }}>
          {buttonVisibility && (
            <Button onClick={() => decrease(`${i + 1}`)}>-</Button>
          )}
          <TeamNameAndSrore
            name={teams[`team${i + 1}`]}
            score={score[`score${i + 1}`]}
            buttonClicked={buttonClicked[i + 1]}
          />
          {buttonVisibility && (
            <Button onClick={() => increase(`${i + 1}`)}>+</Button>
          )}
        </div>
      ))}
    </div>
  );
}
