import { createBrowserRouter } from "react-router";
// import { Home } from "./pages/Home";
import { App } from "./App";
import { Home } from "./pages/Home";
import { Contacts } from "./pages/Contacts";
import { About } from "./pages/About";
import { RickAndMorty } from "./pages/RickAndMorty";
import { Jokes } from "./pages/Jokes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contacts",
        element: <Contacts />,
      },
      {
        path: "rickandmorty",
        element: <RickAndMorty />,
        children: [
          {
            path: ":characterID",
            element: <RickAndMorty />,
          },
        ],
      },
      {
        path: "jokes",
        element: <Jokes />,
      },
    ],
  },
  { path: "*", element: <div>404 - fuck off</div> },
]);
