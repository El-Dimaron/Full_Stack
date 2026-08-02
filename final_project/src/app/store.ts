import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "../features/items/itemSlice";
import themeReducer, { type ThemeType } from "../features/theme/themeSlice";

const savedItems = localStorage.getItem("items");
const savedTheme = localStorage.getItem("theme") as ThemeType | null;

const preloadedState = { items: savedItems ? JSON.parse(savedItems) : undefined, theme: savedTheme ?? "light" };

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    theme: themeReducer,
  },

  preloadedState,
});

store.subscribe(() => {
  const state = store.getState();

  localStorage.setItem("items", JSON.stringify(state.items));
  localStorage.setItem("theme", state.theme);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
