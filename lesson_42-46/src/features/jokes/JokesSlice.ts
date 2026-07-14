import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface JokeState {
  joke: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: JokeState = {
  joke: "",
  isLoading: false,
  error: null,
};

export const fetchJoke = createAsyncThunk<string, void, { rejectValue: string }>("joke/fetchJoke", async (thunkAPI) => {
  try {
    const response = await fetch("https://v2.jokeapi.dev/joke/Programming?format=txt");

    if (!response.ok) {
      return thunkAPI.rejectWithValue("No joke is found");
    }

    const joke: string = await response.text();

    return joke;
  } catch {
    return thunkAPI.rejectWithValue("The request could not be completed");
  }
});

const jokesSlice = createSlice({
  name: "joke",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchJoke.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchJoke.fulfilled, (state, action) => {
        state.isLoading = false;
        state.joke = action.payload;
      })

      .addCase(fetchJoke.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unexpected error happened";
      });
  },
});

export default jokesSlice.reducer;
