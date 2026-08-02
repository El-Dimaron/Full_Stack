import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import { useState } from "react";

export interface Item {
  id: number;
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
  nextId: number;
  searchQuery: string;
}

const initialState: ItemState = {
  list: [],
  nextId: 1,
  searchQuery: "",
};

export const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<NewItem>) => {
      state.list.push({ id: state.nextId, ...action.payload });

      state.nextId += 1;
    },

    addItems: (state, action: PayloadAction<NewItem[]>) => {
      const newItems = action.payload.map((item, index) => ({
        id: state.nextId + index,
        ...item,
      }));

      state.list.push(...newItems);
      state.nextId += newItems.length;
    },

    removeItem: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },

    removeItems: (state) => {
      state.list = [];
    },

    updateItem: (state, action: PayloadAction<Item>) => {
      const itemIndex = state.list.findIndex((item) => item.id === action.payload.id);

      if (itemIndex !== -1) {
        state.list[itemIndex] = action.payload;
      }
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { addItem, addItems, removeItem, removeItems, updateItem, setSearchQuery } = itemSlice.actions;
export default itemSlice.reducer;
