import "./App.css";
import { Header } from "./pages/Header";
import { Outlet } from "react-router";
import type { RootState } from "./app/store";
import { useSelector } from "react-redux";

export function App() {
  const theme = useSelector((state: RootState) => state.theme);

  return (
    <div className={`app-container ${theme}`}>
      <Header></Header>

      <main>
        <Outlet />
      </main>

      <footer></footer>
    </div>
  );
}

export default App;
