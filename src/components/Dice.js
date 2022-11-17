import React, { useState } from "react";
import "./Dice.css";

const Dice = (props) => {
  const handleClick = (e) => {
    props.onHeld();
    // setFixDice((prevFixDice) => !prevFixDice);
  };
  return (
    <div
      className={!props.isHeld ? "dice-item" : "dice-item fix"}
      onClick={handleClick}
    >
      {props.value}
    </div>
  );
};

export default Dice;
