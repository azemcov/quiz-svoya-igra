import { useState } from "react";
import Line from "/src/components/Line/Line.jsx";
import Score from "./components/Score/Score";
import { round1Questions } from "/data.js";
import "./App.css";

function App() {
  return (
    <>
      <Score></Score>
      {round1Questions.map((_, i) => (
        <Line lineN={i}>{round1Questions[i].theme}</Line>
      ))}
    </>
  );
}

export default App;
