import { useEffect, useCallback, useContext } from "react";
import GameLogicContext from "../store/game-logic-context";
import styles from "./Keyboard.module.css";
import Key from "./Key";

function Keyboard() {
  const gameCtx = useContext(GameLogicContext);

  const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  const keyboardClick = useCallback((event) => {
    if (event.key === "Enter") gameCtx.checkRow();
    else if (event.key === "Backspace") gameCtx.deleteChar();
    else gameCtx.addChar(event.key);
  });

  useEffect(() => {
    document.addEventListener("keydown", keyboardClick);

    return () => {
      document.removeEventListener("keydown", keyboardClick);
    };
  }, [keyboardClick]);

  return (
    <div className={styles.Keyboard}>
      <div className={styles.row}>
        {keys[0].map((element) => {
          return <Key key={element} value={element} />;
        })}
      </div>
      <div className={styles.row}>
        {keys[1].map((element) => {
          return <Key key={element} value={element} />;
        })}
      </div>
      <div className={styles.row}>
        <Key value="Enter" special="true" />
        {keys[2].map((element) => {
          return <Key key={element} value={element} />;
        })}
        <Key value="Delete" special="true" />
      </div>
    </div>
  );
}

export default Keyboard;
