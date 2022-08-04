import React from "react";
import Cell from "./Cell";
import style from "./Row.module.css";

function Row(props) {
  let thisRow = [];

  for (let i = 0; i < props.size; i++)
    thisRow.push(<Cell key={i} num={i} rowNum={props.num} />);

  return <div className={style.row}>{thisRow}</div>;
}

export default Row;
