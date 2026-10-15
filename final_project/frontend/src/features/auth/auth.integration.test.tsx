import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Route, Routes } from "react-router";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";

import { Login } from "./Login";
import { Registration } from "./Registration";
import authReducer from "./authSlice";
import { server } from "../../test/server";
import { testUser } from "../../test/handlers";
import { errorToast, successToast } from "../toast/custom_toast";

vi.mock("../toast/custom_toast", () => ({
  errorToast: vi.fn(),
  successToast: vi.fn(),
}));

const baseUrl = "http://localhost";

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });

  const interceptedFetch = globalThis.fetch.bind(globalThis);

  vi.stubGlobal("fetch", (input: RequestInfo | URL, init?: RequestInit) => {
    if (typeof input === "string" && input.startsWith("/")) {
      return interceptedFetch(new URL(input, "http://localhost"), init);
    }

    return interceptedFetch(input, init);
  });
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
  vi.clearAllMocks();
});

afterAll(() => {
  server.close();
  vi.unstubAllGlobals();
});

function renderAuthPage(page: "login" | "registration") {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
  });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[page === "login" ? "/login" : "/registration"]}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/" element={<h1>Головна сторінка</h1>} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );

  return store;
}

describe("Auth integration", () => {
  it("Login: авторизує користувача через API та Redux", async () => {
    const store = renderAuthPage("login");

    fireEvent.change(screen.getByRole("textbox", { name: /email або логін/i }), { target: { value: "testuser" } });

    fireEvent.change(screen.getByLabelText("Пароль"), {
      target: { value: "Password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Увійти" }));

    expect(
      await screen.findByRole("heading", {
        name: "Головна сторінка",
      }),
    ).toBeInTheDocument();

    expect(store.getState().auth).toEqual({
      user: testUser,
      isLoading: false,
      error: null,
    });

    expect(successToast).toHaveBeenCalledWith("Ви успішно увійшли в акаунт.");
  });

  it("Login: обробляє помилку API 401", async () => {
    server.use(
      http.post(`${baseUrl}/api/auth/login`, () => {
        return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
      }),
    );

    const store = renderAuthPage("login");

    fireEvent.change(screen.getByRole("textbox", { name: /email або логін/i }), { target: { value: "testuser" } });

    fireEvent.change(screen.getByLabelText("Пароль"), {
      target: { value: "WrongPassword123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Увійти" }));

    expect(await screen.findByText("Неправильний email або пароль")).toBeInTheDocument();

    expect(store.getState().auth.user).toBeNull();
    expect(store.getState().auth.isLoading).toBe(false);
    expect(store.getState().auth.error).toBe("Неправильний email або пароль");

    expect(successToast).not.toHaveBeenCalled();
  });

  it("Registration: реєструє користувача через API та Redux", async () => {
    const store = renderAuthPage("registration");

    fireEvent.change(screen.getByRole("textbox", { name: "Логін" }), { target: { value: "testuser" } });

    fireEvent.change(screen.getByRole("textbox", { name: "Email" }), { target: { value: "test@example.com" } });

    fireEvent.change(screen.getByLabelText("Пароль", { exact: true }), { target: { value: "Password123" } });

    fireEvent.change(screen.getByLabelText("Повторіть пароль"), { target: { value: "Password123" } });

    fireEvent.click(screen.getByRole("button", { name: "Зареєструватися" }));

    expect(
      await screen.findByRole("heading", {
        name: "Головна сторінка",
      }),
    ).toBeInTheDocument();

    expect(store.getState().auth.user).toEqual(testUser);
    expect(store.getState().auth.error).toBeNull();

    expect(successToast).toHaveBeenCalledWith("Акаунт успішно створено.");
  });

  it("Registration: не реєструє користувача із зайнятим логіном", async () => {
    server.use(
      http.get(`${baseUrl}/api/auth/check-availability`, ({ request }) => {
        const url = new URL(request.url);

        if (url.searchParams.has("login")) {
          return HttpResponse.json({
            loginAvailable: false,
          });
        }

        return HttpResponse.json({
          emailAvailable: true,
        });
      }),
    );

    let registrationRequests = 0;

    server.use(
      http.post(`${baseUrl}/api/auth/register`, () => {
        registrationRequests += 1;
        return HttpResponse.json(testUser);
      }),
    );

    const store = renderAuthPage("registration");

    fireEvent.change(screen.getByRole("textbox", { name: "Логін" }), { target: { value: "testuser" } });

    fireEvent.change(screen.getByRole("textbox", { name: "Email" }), { target: { value: "test@example.com" } });

    fireEvent.change(screen.getByLabelText("Пароль", { exact: true }), { target: { value: "Password123" } });

    fireEvent.change(screen.getByLabelText("Повторіть пароль"), { target: { value: "Password123" } });

    fireEvent.click(screen.getByRole("button", { name: "Зареєструватися" }));

    expect(await screen.findByText("Користувач з таким логіном вже існує.")).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByRole("button", {
          name: "Зареєструватися",
        }),
      ).toBeEnabled();
    });

    expect(registrationRequests).toBe(0);
    expect(store.getState().auth.user).toBeNull();
    expect(successToast).not.toHaveBeenCalled();
  });

  it("Registration: обробляє помилку API 409", async () => {
    server.use(
      http.post(`${baseUrl}/api/auth/register`, () => {
        return HttpResponse.json({ message: "User already exists" }, { status: 409 });
      }),
    );

    const store = renderAuthPage("registration");

    fireEvent.change(screen.getByRole("textbox", { name: "Логін" }), { target: { value: "testuser" } });

    fireEvent.change(screen.getByRole("textbox", { name: "Email" }), { target: { value: "test@example.com" } });

    fireEvent.change(screen.getByLabelText("Пароль", { exact: true }), { target: { value: "Password123" } });

    fireEvent.change(screen.getByLabelText("Повторіть пароль"), { target: { value: "Password123" } });

    fireEvent.click(screen.getByRole("button", { name: "Зареєструватися" }));

    await waitFor(() => {
      expect(errorToast).toHaveBeenCalledWith("User already exists");
    });

    expect(store.getState().auth.user).toBeNull();
    expect(store.getState().auth.error).toBe("User already exists");

    expect(successToast).not.toHaveBeenCalled();
  });
});
