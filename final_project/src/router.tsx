import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { Contacts } from "./pages/Contacts";
import { CreateItem } from "./pages/CreateItem";
import { UpdateItem } from "./pages/UpdateItem";
import { NotFound } from "./pages/NotFound";
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
      { path: "/shop", element: <Shop /> },
      { path: "/contacts", element: <Contacts /> },
      { path: "/create-item", element: <CreateItem /> },
      { path: "/update-item/:itemId", element: <UpdateItem /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
