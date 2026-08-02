import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./reset.scss";
import { router } from "./router";
import { RouterProvider } from "react-router";
import { store } from "./app/store";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
