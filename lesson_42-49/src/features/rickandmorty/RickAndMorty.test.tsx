import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { afterEach, describe, expect, test, vi } from "vitest";

import { RickAndMorty } from "./RickAndMorty";
import rickAndMortyReducer from "./rickAndMortySlice";

const mockedCharacter = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  image: "https://example.com/rick.png",
};

function renderRickAndMorty() {
  const store = configureStore({
    reducer: {
      rickAndMorty: rickAndMortyReducer,
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/rickandmorty/1"]}>
        <Routes>
          <Route path="/rickandmorty/:characterID" element={<RickAndMorty />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
}

describe("RickAndMorty", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("показує індикатор завантаження під час виконання запиту", () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(() => new Promise<Response>(() => {}));

    renderRickAndMorty();

    expect(screen.getByText("Завантаження...")).toBeInTheDocument();
  });

  test("показує дані персонажа після успішного запиту", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => mockedCharacter,
    } as Response);

    renderRickAndMorty();

    expect(
      await screen.findByRole("heading", {
        name: "Rick Sanchez",
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("Status: Alive")).toBeInTheDocument();
    expect(screen.getByText("Species: Human")).toBeInTheDocument();

    expect(
      screen.getByRole("img", {
        name: "Rick Sanchez",
      }),
    ).toHaveAttribute("src", mockedCharacter.image);
  });

  test("показує повідомлення про помилку, якщо персонажа не знайдено", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      json: async () => ({}),
    } as Response);

    renderRickAndMorty();

    expect(await screen.findByText("Character is not found")).toBeInTheDocument();
  });

  test("показує повідомлення про помилку, якщо запит не виконався", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("Network error"));

    renderRickAndMorty();

    expect(await screen.findByText("The request could not be completed")).toBeInTheDocument();
  });
});
