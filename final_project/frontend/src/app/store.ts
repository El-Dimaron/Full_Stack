import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "../features/items/itemSlice";
import themeReducer from "../features/theme/themeSlice";
import usersReducer from "../features/users/usersSlice";

const savedItems = localStorage.getItem("items");

const preloadedState = {
  items: savedItems ? JSON.parse(savedItems) : undefined,
};

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    users: usersReducer,
    theme: themeReducer,
  },

  preloadedState,
});

store.subscribe(() => {
  const state = store.getState();

  localStorage.setItem("items", JSON.stringify(state.items));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
