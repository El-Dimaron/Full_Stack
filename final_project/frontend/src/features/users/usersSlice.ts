import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type User = {
  id: number;
  login: string;
};

type UsersState = {
  users: User[];
  isLoading: boolean;
  error: string | null;
};

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("/api/users");

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
});

const usersSlice = createSlice({
  name: "users",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export default usersSlice.reducer;
