import { useState, useContext, useEffect } from "react";
import styles from "./Cell.module.css";
import GameLogicContext from "../store/game-logic-context";

function Cell(props) {
  const location = { row: props.rowNum, col: props.num };
  const gameCtx = useContext(GameLogicContext);

  let [color, setColor] = useState("");
  let [input, setInput] = useState("");

  useEffect(() => {
    if (gameCtx.board.length > 0)
      setInput(gameCtx.board[location.row][location.col]);
  }, [gameCtx.board, gameCtx.numOfGuesses]);

  useEffect(() => {
    if (gameCtx.attmpets.length > 0) {
      let value = gameCtx.attmpets[location.row][location.col];

      if (value === gameCtx.match.WRONG) setColor("wrong");
      else if (value === gameCtx.match.CORRECT) setColor("correct");
      else if (value === gameCtx.match.WRONG_SPOT) setColor("wrong-spot");
    }
  }, [gameCtx.attmpets]);

  return (
    <div className={styles.box} id={color}>
      {input}
    </div>
  );
}

export default Cell;
