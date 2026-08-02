import "./App.scss";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Outlet } from "react-router";
import { useAppSelector } from "./app/hooks";

export function App() {
  const theme = useAppSelector((state) => state.theme);

  return (
    <div className={`main-page ${theme}`}>
      <Header />

      <main className="page">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
