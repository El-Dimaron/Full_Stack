// import { useState } from "react";
import "./App.css";
import { Header } from "./pages/Header";
import { Outlet } from "react-router";

export function App() {
  return (
    <div className="app-container">
      <Header />

      <main>
        <Outlet />
      </main>

      <footer></footer>
    </div>
  );
}

export default App;
