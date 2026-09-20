import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { API_ROUTES } from "../../api/routes";

export interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  availability: string;
  sizes: string[];
  colors: string[];
  image: string;
}

export type NewItem = Omit<Item, "id">;

interface ItemState {
  list: Item[];
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: ItemState = {
  list: [],
  searchQuery: "",
  isLoading: false,
  error: null,
};

export const fetchItems = createAsyncThunk<Item[]>("items/fetchItems", async () => {
  const response = await fetch(API_ROUTES.items);

  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }

  return response.json();
});

export const createItem = createAsyncThunk<Item, NewItem>("items/createItem", async (itemData) => {
  const response = await fetch(API_ROUTES.items, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(itemData),
  });

  if (!response) {
    throw new Error("Failed to create item");
  }

  return response.json();
});

export const updateItem = createAsyncThunk<Item, { id: string; itemData: Partial<NewItem> }>(
  "items/updateItems",
  async ({ id, itemData }) => {
    const response = await fetch(API_ROUTES.item(id), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    });

    if (!response.ok) {
      throw new Error("Failed to update item");
    }

    return response.json();
  },
);

export const deleteItem = createAsyncThunk<string, string>("items/deleteItem", async (id) => {
  const response = await fetch(API_ROUTES.item(id), { method: "DELETE" });

  if (!response.ok) {
    throw new Error("Failed to delete item");
  }

  return id;
});

export const deleteAllItems = createAsyncThunk("items/deleteAllItems", async () => {
  const response = await fetch(API_ROUTES.deleteAllItems, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete items");
  }
});

export const itemSlice = createSlice({
  name: "items",

  initialState,

  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })

      .addCase(fetchItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Failed to fetch items";
      })

      .addCase(createItem.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      .addCase(updateItem.fulfilled, (state, action) => {
        const itemIndex = state.list.findIndex((item) => item.id === action.payload.id);

        if (itemIndex !== -1) {
          state.list[itemIndex] = action.payload;
        }
      })

      .addCase(deleteItem.fulfilled, (state, action) => {
        state.list = state.list.filter((item) => item.id !== action.payload);
      })

      .addCase(deleteAllItems.fulfilled, (state) => {
        state.list = [];
      });
  },
});

export const { setSearchQuery } = itemSlice.actions;
export default itemSlice.reducer;
