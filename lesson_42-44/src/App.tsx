// import { useState } from "react";
import "./App.css";
import { Header } from "./pages/Header";
import { Outlet } from "react-router";
import { ThemeContext, type ThemeType } from "./context/AppContext";
import { useState } from "react";

export function App() {
  const [theme, setTheme] = useState<ThemeType>("dark");

  return (
    <div className={`app-container ${theme}`}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Header></Header>

        <main>
          <Outlet />
        </main>

        <footer></footer>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
