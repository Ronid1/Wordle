import "./App.css";
import Board from "../src/components/Board";
import Keyboard from "../src/components/Keyboard";
import SizeInitializer from "./components/SizeInitializer";
import Backdrop from "./components/Backdrop";
import { useState } from "react";

function App() {
  let [initialized, setInitialized] = useState(false);

  function startGame() {
    setInitialized(true);
  }

  return (
    <>
      <h1> Wordle </h1>
      {!initialized && <SizeInitializer done={startGame} />}
      {!initialized && <Backdrop />}
      <Board />
      <Keyboard initialized={initialized} />
    </>
  );
}

export default App;
