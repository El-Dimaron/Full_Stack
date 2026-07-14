import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import themeReducer from "../features/theme/themeSlice";
import rickAndMortySliceReducer from "../features/rickandmorty/rickAndMortySlice";
import jokesReducer from "../features/jokes/JokesSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    theme: themeReducer,
    rickAndMorty: rickAndMortySliceReducer,
    jokes: jokesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
