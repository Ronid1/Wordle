import { useState, useContext } from "react";
import styles from "./GameOver.module.css";
import GameLogicContext from "../store/game-logic-context";

function GameOver(props) {
  let [closeGame, setCloseGame] = useState(false);

  const gameCtx = useContext(GameLogicContext);

  function restartGame() {
    props.restart();
  }

  function endGame() {
    setCloseGame(true);
  }

  return (
    <>
      {!closeGame ? (
        <div className="modal">
          {gameCtx.win && <p>You Win!</p>}
          <p>The word was: {gameCtx.word}</p>
          <br />
          <p>Play Again?</p>
          <button onClick={restartGame}>Yes</button>
          <button onClick={endGame}>No</button>
        </div>
      ) : (
        <p className="modal" id={styles.goodbye}>
          Thanks for playing!
        </p>
      )}
    </>
  );
}

export default GameOver;
