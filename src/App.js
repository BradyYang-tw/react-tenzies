import React, { useState, useEffect } from "react";
import "./App.css";
import Dice from "./components/Dice";

const App = () => {
  const generateDices = (n) => {
    let newDices = [];
    for (let i = 0; i <= n; i++) {
      newDices.push({
        id: i + 1,
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
      });
    }
    return newDices;
  };
  const [dices, setDices] = useState(generateDices(9));
  const [tenzies, setTenzies] = useState(false);

  const rollDice = () => {
    if (tenzies) {
      setDices(generateDices(9));
      setTenzies(false);
    } else {
      setDices((prevDices) =>
        prevDices.map((data) => {
          if (!data.isHeld) {
            return { ...data, value: Math.ceil(Math.random() * 6) };
          } else {
            return data;
          }
        })
      );
    }

    // setDices(generateDices(9));
  };
  useEffect(() => {
    console.log("dices state change");

    // check dices all held
    let allHeld = dices.filter((data) => data.isHeld === false);

    let allSame = dices.filter((data) => data.value !== dices[0].value);
    if (allHeld.length == 0 && allSame.length == 0) {
      console.log("You won!!!");
      setTenzies(true);
    }
  }, [dices]);
  // useEffect(() => {
  //   console.log("use effect");

  //   setDices((prevDices) => {
  //     let newArray = [];
  //     for (let i = 0; i < 10; i++) {
  //       newArray.push(<Dice key={i + 1}></Dice>);
  //     }
  //     return newArray;
  //   });
  // }, [roll]);

  // const randomClick = () => {
  //   setRoll((prev) => !prev);
  // };

  const handleHeld = (id) => {
    // console.log(id);
    setDices((prevDices) => {
      let a = prevDices.map((data) => {
        return data.id == id ? { ...data, isHeld: !data.isHeld } : data;
        // if (data.id == id) {
        //   data.isHeld = !data.isHeld;
        //   console.log(data);
        // }
        // return data;
      });
      return a;
    });

    // setDices((prev) => {
    //   let update = prev.map((d) => {
    //     if (d.id === id) {
    //       {...d, isHeld: !d.isHeld}
    //       // console.log(d);
    //       // d.isHeld = !d.isHeld;
    //     }

    //     return d;
    //   });
    //   return update;
    // });
  };

  let allDices = dices.map((d) => {
    return (
      <Dice
        key={d.id}
        value={d.value}
        isHeld={d.isHeld}
        onHeld={() => handleHeld(d.id)}
      ></Dice>
    );
  });

  return (
    <div className="app">
      <h1 className="app-h1">Tenzies</h1>
      <p className="app-p">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <main className="app-dices">{allDices}</main>
      <button className="app-button" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </div>
  );
};

export default App;
