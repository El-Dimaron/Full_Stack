import { useState } from "react";
import "./App.css";
import ButtonStandard from "./components/Button";

export default function App() {
  const [counter, setCounter] = useState(0);

  function counterIncrease() {
    setCounter(counter + 1);
  }

  return <ButtonStandard text="Натисни мене" type="button" counter={counter} onClick={counterIncrease} />;
}
