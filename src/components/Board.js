import { useContext } from "react";
import Row from "./Row";
import style from "./Board.module.css";
import GameLogicContext from "../store/game-logic-context";

function Board() {
  const gameCtx = useContext(GameLogicContext);

  let rows = [];

  for (let i = 0; i < gameCtx.numOfGuesses; i++)
    rows.push(<Row key={i} num={i} size={gameCtx.wordLength} />);

  return <div className={style.board}>{rows}</div>;
}

export default Board;
