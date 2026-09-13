import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type ThemeType = "dark" | "light";

const initialState = "light" as ThemeType;

export const fetchTheme = createAsyncThunk("theme/fetchTheme", async () => {
  const response = await fetch("/api/theme");

  if (!response.ok) {
    throw new Error("Failed to fetch theme");
  }

  const data: { theme: ThemeType } = await response.json();

  return data.theme;
});

export const saveTheme = createAsyncThunk("theme/saveTheme", async (theme: ThemeType) => {
  const response = await fetch("/api/theme", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ theme }),
  });

  if (!response.ok) {
    throw new Error("Failed to save theme");
  }
  const data: { theme: ThemeType } = await response.json();

  return data.theme;
});

const themeSlice = createSlice({
  name: "theme",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchTheme.fulfilled, (_state, action) => {
        return action.payload;
      })

      .addCase(saveTheme.fulfilled, (_state, action) => {
        return action.payload;
      });
  },
});

export default themeSlice.reducer;
