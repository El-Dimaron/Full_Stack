import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { UncontrolledInput, ControlledInput } from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UncontrolledInput label="Імʼя" />
    <ControlledInput label="Імʼя" />
  </StrictMode>,
);
