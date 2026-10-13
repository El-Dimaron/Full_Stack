import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { Contacts } from "./pages/Contacts";
import { CreateItem } from "./pages/CreateItem";
import { UpdateItem } from "./pages/UpdateItem";
import { ItemDetails } from "./pages/ItemDetails";
import { Login } from "./features/auth/Login";
import { NotFound } from "./pages/NotFound";
import { App } from "./App";
import { Registration } from "./features/auth/Registration";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "/login", element: <Login /> },
      { path: "/registration", element: <Registration /> },
      { path: "/shop", element: <Shop /> },
      { path: "/item/:itemId", element: <ItemDetails /> },
      { path: "/create-item", element: <CreateItem /> },
      { path: "/update-item/:itemId", element: <UpdateItem /> },
      { path: "/contacts", element: <Contacts /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
