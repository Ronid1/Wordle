import { useContext, useState } from "react";
import GameLogicContext from "../store/game-logic-context";
import styles from "./SizeInitializer.module.css";

function SizeInitializer(props) {
  const gameCtx = useContext(GameLogicContext);
  let [width, setWidth] = useState(gameCtx.wordLength);
  let [length, setLength] = useState(gameCtx.numOfGuesses);

  function setBoardWidth(event) {
    setWidth(parseInt(event.target.value));
  }

  function setBoardLength(event) {
    setLength(parseInt(event.target.value));
  }

  function startGame() {
    gameCtx.startGame(width, length);
    props.done();
  }

  return (
    <div className={styles.modal}>
      <div className={styles.question}>
        <p>How long should the word be?</p>
        <div>
          <input
            className={styles.radio}
            type="radio"
            checked={width === 4}
            onChange={setBoardWidth}
            value={4}
            id="4"
          />{" "}
          4
          <input
            className={styles.radio}
            type="radio"
            checked={width === 5}
            onChange={setBoardWidth}
            value={5}
            id="5"
          />{" "}
          5
          <input
            className={styles.radio}
            type="radio"
            checked={width === 6}
            onChange={setBoardWidth}
            value={6}
            id="6"
          />{" "}
          6
        </div>
      </div>
      <div className={styles.question}>
        <p>How many guesses?</p>
        <div>
          <input
            className={styles.radio}
            type="radio"
            checked={length === 4}
            onChange={setBoardLength}
            value={4}
            id="4"
          />{" "}
          4
          <input
            className={styles.radio}
            type="radio"
            checked={length === 5}
            onChange={setBoardLength}
            value={5}
            id="5"
          />{" "}
          5
          <input
            className={styles.radio}
            type="radio"
            checked={length === 6}
            onChange={setBoardLength}
            value={6}
            id="6"
          />{" "}
          6
          <input
            className={styles.radio}
            type="radio"
            checked={length === 7}
            onChange={setBoardLength}
            value={7}
            id="7"
          />{" "}
          7
          <input
            className={styles.radio}
            type="radio"
            checked={length === 8}
            onChange={setBoardLength}
            value={8}
            id="8"
          />{" "}
          8
        </div>
      </div>
      <button className={styles.button} onClick={startGame}>
        {" "}
        Start Game{" "}
      </button>
    </div>
  );
}

export default SizeInitializer;
