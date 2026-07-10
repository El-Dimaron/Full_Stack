import "./App.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Outlet } from "react-router";

export function App() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
