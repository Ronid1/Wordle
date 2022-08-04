import { useContext, useEffect, useState } from "react";
import Row from "./Row";
import style from "./Board.module.css";
import GameLogicContext from "../store/game-logic-context";

function Board() {
  const gameCtx = useContext(GameLogicContext);
  let [rows, setRows] = useState([]);

  useEffect(() => {
    let temp = [];
    for (let i = 0; i < gameCtx.numOfGuesses; i++)
      temp.push(<Row key={i} num={i} size={gameCtx.wordLength} />);
    setRows(temp);
  }, [gameCtx.numOfGuesses, gameCtx.wordLength]);

  return <div className={style.board}>{rows}</div>;
}

export default Board;
