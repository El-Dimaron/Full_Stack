import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";

import itemsReducer from "./itemSlice";
import { ItemForm } from "./ItemForm";

const renderItemForm = (component: ReactNode) => {
  const store = configureStore({
    reducer: {
      items: itemsReducer,
    },
  });

  return {
    store,

    ...render(
      <Provider store={store}>
        <MemoryRouter>{component}</MemoryRouter>
      </Provider>,
    ),
  };
};

describe("ItemForm", () => {
  it("should render the form", () => {
    renderItemForm(<ItemForm />);

    expect(
      screen.getByRole("button", {
        name: /створити товар/i,
      }),
    ).toBeInTheDocument();
  });
});
