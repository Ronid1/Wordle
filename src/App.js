import "./App.css";
import Board from "../src/components/Board";
import Keyboard from "../src/components/Keyboard";
import SizeInitializer from "./components/SizeInitializer";
import Backdrop from "./components/Backdrop";
import GameOver from "./components/GameOver";
import { useState, useContext } from "react";
import GameLogicContext from "./store/game-logic-context";

function App() {
  const gameCtx = useContext(GameLogicContext);
  let [initialized, setInitialized] = useState(false);

  function startGame() {
    setInitialized(true);
  }

  function restartGame() {
    gameCtx.resetGame()
    gameCtx.setGameOver(false);
    setInitialized(false);
  }

  return (
    <>
      <h1> Wordle </h1>
      {!initialized && <SizeInitializer done={startGame} />}
      {!initialized && <Backdrop />}
      {gameCtx.gameOver && <GameOver restart={restartGame} />}
      {gameCtx.gameOver && <Backdrop />}
      <Board initialized={initialized} />
      <Keyboard initialized={initialized} />
    </>
  );
}

export default App;
