"use client"

import './page.css'
import { useState } from 'react';

type Mode = "none" | "+" | "-" | "*" | "/";

export default function App() {
  const [result, setResult] = useState(0);
  const [mode, setMode] = useState<Mode>('none');
  const [display, setDisplay] = useState('0');

  const calculate = (value: number) => {
    switch (mode) {
      case "+":
        setMode('none');
        return(result + value);
      case "-":
        setMode('none');
        return(result - value);
      case "*":
        setMode('none');
        return(result * value);
      case "/":
        setMode('none');
        return(result / value);
      case "none":
        return value;
    }
    
  };  

  const layout = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+",
    "DEL", "AC"
  ];

  const handleBtnClk = (btn: string) => {
    if (btn >= "0" && btn <= "9") {
      setDisplay(display === '0' ? btn : display + btn);
    } else if (btn === ".") {
      setDisplay(display + ".");
    } else if (btn === "+" || btn === "-" || btn === "*" || btn === "/") {
      const newResult = calculate(parseFloat(display));
      setResult(newResult);
      setMode(btn as Mode);
      setDisplay("0");
    } else if (btn === "=") {
      const newResult = calculate(parseFloat(display));
      setResult(newResult);
      setDisplay(String(newResult));
    } else if (btn === "DEL") {
      setDisplay(String(Math.floor(parseFloat(display) / 10)));
    } else if (btn === "AC") {
      setDisplay('0');
      setResult(0);
      setMode('none');
    }
  }

  return (
    <div>
      <input value={display} readOnly={true} />
      <p>Result: {result}</p>
      <section className="buttons">

        {layout.map((btn: string) => (
          <button key={btn} onClick={() => handleBtnClk(btn)}>{btn}</button>
        ))}
        
      </section>
    </div>
  )
}