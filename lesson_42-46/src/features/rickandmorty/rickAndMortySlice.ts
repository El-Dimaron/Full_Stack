import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

interface CharacterState {
  character: Character | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CharacterState = {
  character: null,
  isLoading: false,
  error: null,
};

export function getRandomCharacterId() {
  return Math.ceil(Math.random() * 826);
}

export const fetchCharacter = createAsyncThunk<Character, number, { rejectValue: string }>(
  "character/fetchCharacter",
  async (characterID, thunkAPI) => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${characterID}`);
      console.log(`Fetch character ${characterID}`);

      if (!response.ok) {
        return thunkAPI.rejectWithValue("Character is not found");
      }

      const character = await response.json();

      return character;
    } catch {
      return thunkAPI.rejectWithValue("The request could not be completed");
    }
  },
);

const rickAndMortySlice = createSlice({
  name: "character",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacter.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchCharacter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.character = action.payload;
      })

      .addCase(fetchCharacter.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unexpected error happened";
      });
  },
});

export default rickAndMortySlice.reducer;
