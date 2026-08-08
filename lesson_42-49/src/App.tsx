import "./App.css";
import { Header } from "./pages/Header";
import { Outlet } from "react-router";
import type { RootState } from "./app/store";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

export function App() {
  const theme = useSelector((state: RootState) => state.theme);

  return (
    <div className={`app-container ${theme}`}>
      <Header></Header>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />

      <main>
        <Outlet />
      </main>

      <footer></footer>
    </div>
  );
}

export default App;
