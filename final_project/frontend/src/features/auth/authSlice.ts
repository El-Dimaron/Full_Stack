import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type User = {
  id: string;
  login: string;
  email: string;
};

type LoginData = {
  identifier: string;
  password: string;
};

type RegistrationData = {
  login: string;
  email: string;
  password: string;
};

type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk<User, LoginData, { rejectValue: string }>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      return rejectWithValue("Неправильний email або пароль");
    }

    return response.json();
  },
);

export const register = createAsyncThunk<User, RegistrationData, { rejectValue: string }>(
  "auth/register",
  async (registrationData, { rejectWithValue }) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(registrationData),
    });

    const data = await response.json();

    if (!response.ok) {
      return rejectWithValue(data.message ?? "Failed to register");
    }

    return data;
  },
);

export const fetchCurrentUser = createAsyncThunk<User, void, { rejectValue: string }>(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    const response = await fetch("/api/auth/me");

    if (!response.ok) {
      return rejectWithValue("Unauthorized");
    }

    return response.json();
  },
);

export const logout = createAsyncThunk("auth/logout", async () => {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to logout");
  }
});

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Cases for the login

      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })

      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Login failed";
      })

      // Cases for the registration

      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })

      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Registration failed";
      })

      // Cases for the current user

      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null;
      })

      // Cases for the logout

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
