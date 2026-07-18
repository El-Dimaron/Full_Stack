import { createSlice } from "@reduxjs/toolkit";

export type ThemeType = "dark" | "light";

const initialState = "dark" as ThemeType;

export type ThemeContextType = {
  theme: ThemeType;
  setTheme: React.Dispatch<React.SetStateAction<ThemeType>>;
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggle: (state): ThemeType => {
      return state === "dark" ? "light" : "dark";
    },
  },
});

export const { toggle } = themeSlice.actions;
export default themeSlice.reducer;
