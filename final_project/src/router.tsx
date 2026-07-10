import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { App } from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  { path: "*", element: <div>404 - fuck off</div> },
]);
