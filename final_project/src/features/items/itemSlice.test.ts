import { describe, expect, it } from "vitest";
import itemsReducer, { addItem, addItems, removeItem, updateItem, setSearchQuery } from "./itemSlice";

describe("itemSlice", () => {
  const initialState = {
    list: [],
    nextId: 1,
    searchQuery: "",
  };

  const testItem = {
    name: "Базова футболка",
    description: "Бавовняна футболка",
    price: 799,
    discount: 10,
    availability: "In stock",
    sizes: ["S", "M", "L"],
    colors: ["Black", "White"],
    image: "test-image.png",
  };

  it("should return initial state", () => {
    const state = itemsReducer(undefined, {
      type: "unknown",
    });

    expect(state).toEqual(initialState);
  });

  it("should add an item", () => {
    const state = itemsReducer(initialState, addItem(testItem));

    expect(state.list).toHaveLength(1);

    expect(state.list[0]).toEqual({
      id: 1,
      ...testItem,
    });
  });

  it("should increment nextId after adding item", () => {
    const state = itemsReducer(initialState, addItem(testItem));

    expect(state.nextId).toBe(2);
  });

  it("should assign different ids to multiple items", () => {
    let state = itemsReducer(initialState, addItem(testItem));

    state = itemsReducer(
      state,
      addItem({
        ...testItem,
        name: "Худі",
      }),
    );

    expect(state.list[0].id).toBe(1);
    expect(state.list[1].id).toBe(2);
    expect(state.nextId).toBe(3);
  });

  it("should remove an item", () => {
    const stateWithItem = itemsReducer(initialState, addItem(testItem));

    const state = itemsReducer(stateWithItem, removeItem(1));

    expect(state.list).toHaveLength(0);
  });

  it("should update an item", () => {
    const stateWithItem = itemsReducer(initialState, addItem(testItem));

    const updatedItem = {
      ...stateWithItem.list[0],
      name: "Оновлена футболка",
      price: 999,
    };

    const state = itemsReducer(stateWithItem, updateItem(updatedItem));

    expect(state.list[0].name).toBe("Оновлена футболка");

    expect(state.list[0].price).toBe(999);
  });

  it("should update search query", () => {
    const state = itemsReducer(initialState, setSearchQuery("футболка"));

    expect(state.searchQuery).toBe("футболка");
  });

  it("should add multiple items", () => {
    const items = [
      {
        ...testItem,
        name: "Футболка",
      },
      {
        ...testItem,
        name: "Худі",
      },
      {
        ...testItem,
        name: "Сорочка",
      },
    ];

    const state = itemsReducer(initialState, addItems(items));

    expect(state.list).toHaveLength(3);

    expect(state.list.map((item) => item.id)).toEqual([1, 2, 3]);

    expect(state.nextId).toBe(4);
  });
});
