import "./App.scss";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Outlet } from "react-router";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchTheme } from "./features/theme/themeSlice";
import { ToastContainer } from "react-toastify";
import { fetchCurrentUser } from "./features/auth/authSlice";

export function App() {
  const theme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTheme());
    dispatch(fetchCurrentUser());
  }, [dispatch]);

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

      <main className="page">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
