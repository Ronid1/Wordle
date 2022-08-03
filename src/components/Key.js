import { useContext, useEffect, useState } from "react";
import styles from "./Key.module.css";
import GameLogicContext from "../store/game-logic-context";

function Key(props) {
  const gameCtx = useContext(GameLogicContext);
  let [color, setColor] = useState("");

  useEffect(() => {
    if (props.special) return;

    for (let i = 0; i < gameCtx.wordLength; i++) {
      if (
        gameCtx.attmpets.length > 0 &&
        gameCtx.board.length > 0 &&
        gameCtx.currLocation.row > 0 &&
        gameCtx.board[gameCtx.currLocation.row - 1][i] == props.value
      ) {
        let value = gameCtx.attmpets[gameCtx.currLocation.row - 1][i];
        console.log("value at", i, value);

        if (value === gameCtx.match.WRONG) setColor("wrong");
        else if (value === gameCtx.match.CORRECT) setColor("correct");
        else if (value === gameCtx.match.WRONG_SPOT) {
          setColor("wrong-spot");
        }
      }
    }
  }, [gameCtx.attmpets]);

  function typeLetter() {
    if (props.value == "Enter") {
      gameCtx.checkRow();
    } else if (props.value == "Delete") {
      gameCtx.deleteChar();
    } else {
      gameCtx.addChar(props.value);
    }
  }

  return (
    <div
      className={styles.key}
      id={props.special ? styles.special_key : color}
      onClick={typeLetter}
    >
      {props.value}
    </div>
  );
}

export default Key;
