import { createBrowserRouter } from "react-router";
// import { Home } from "./pages/Home";
import { App } from "./App";
import { Home } from "./pages/Home";
import { Contacts } from "./pages/Contacts";
import { About } from "./pages/About";
import { Forms } from "./pages/Forms";
// import { RickAndMorty } from "./pages/RickAndMorty";
import { RickAndMorty } from "./features/rickandmorty/RickAndMorty";
import { Jokes } from "./features/jokes/Jokes";

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
        path: "forms",
        element: <Forms />,
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
        path: "rickandmorty/:characterID?",
        element: <RickAndMorty />,
      },
      {
        path: "jokes",
        element: <Jokes />,
      },
    ],
  },
  { path: "*", element: <div>404 - fuck off</div> },
]);
