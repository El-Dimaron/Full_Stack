import "./App.scss";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Outlet } from "react-router";
import { useAppSelector } from "./app/hooks";
import { ToastContainer } from "react-toastify";
import { IdleTracker } from "./components/IdleTracker";

export function App() {
  const theme = useAppSelector((state) => state.theme);

  return (
    <div className={`main-page ${theme}`}>
      <ToastContainer
        theme={theme}
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
      <Header />

      <IdleTracker />

      <main className="page">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
