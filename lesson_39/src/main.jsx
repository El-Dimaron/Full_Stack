import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { StatelessTitle, LoginLogout } from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StatelessTitle />
    <StatelessTitle name="man" />
    <LoginLogout />
  </StrictMode>,
);
