import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { configureStore } from "@reduxjs/toolkit";

import authReducer, { login, register, fetchCurrentUser, logout } from "./authSlice";

describe("authSlice", () => {
  const fetchMock = vi.fn();

  const testUser = {
    id: "123",
    login: "testuser",
    email: "test@example.com",
  };

  const loginData = {
    identifier: "testuser",
    password: "Password123",
  };

  const registrationData = {
    login: "testuser",
    email: "test@example.com",
    password: "Password123",
  };

  // Новий Redux Store для кожного тесту.
  function createTestStore() {
    return configureStore({
      reducer: {
        auth: authReducer,
      },
    });
  }

  // Підміна відповіді сервера.
  function mockResponse(data: unknown, ok = true) {
    fetchMock.mockResolvedValue({
      ok,
      json: async () => data,
    });
  }

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("initialState", () => {
    it("має правильний початковий стан", () => {
      const store = createTestStore();

      expect(store.getState().auth).toEqual({
        user: null,
        isLoading: false,
        error: null,
      });
    });
  });

  describe("login", () => {
    it("встановлює isLoading=true під час запиту", async () => {
      const store = createTestStore();

      let resolveRequest!: (value: Response) => void;

      const request = new Promise<Response>((resolve) => {
        resolveRequest = resolve;
      });

      fetchMock.mockReturnValue(request);

      const loginPromise = store.dispatch(login(loginData));

      // Запит ще не завершився.
      expect(store.getState().auth).toEqual({
        user: null,
        isLoading: true,
        error: null,
      });

      // Завершуємо запит.
      resolveRequest({
        ok: true,
        json: async () => testUser,
      } as Response);

      await loginPromise;

      expect(store.getState().auth.isLoading).toBe(false);
    });

    it("зберігає користувача після успішного входу", async () => {
      const store = createTestStore();

      mockResponse(testUser);

      const result = await store.dispatch(login(loginData));

      expect(login.fulfilled.match(result)).toBe(true);

      expect(fetchMock).toHaveBeenCalledWith("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      expect(store.getState().auth).toEqual({
        user: testUser,
        isLoading: false,
        error: null,
      });
    });

    it("зберігає помилку при невдалому вході", async () => {
      const store = createTestStore();

      mockResponse({}, false);

      const result = await store.dispatch(login(loginData));

      expect(login.rejected.match(result)).toBe(true);

      expect(store.getState().auth).toEqual({
        user: null,
        isLoading: false,
        error: "Неправильний email або пароль",
      });
    });

    it("очищає попередню помилку при новому запиті", async () => {
      const store = createTestStore();

      // Перша спроба невдала.
      mockResponse({}, false);
      await store.dispatch(login(loginData));

      expect(store.getState().auth.error).not.toBeNull();

      // Друга спроба успішна.
      mockResponse(testUser);
      await store.dispatch(login(loginData));

      expect(store.getState().auth.error).toBeNull();
      expect(store.getState().auth.user).toEqual(testUser);
    });
  });

  describe("register", () => {
    it("реєструє користувача й оновлює state", async () => {
      const store = createTestStore();

      mockResponse(testUser);

      const result = await store.dispatch(register(registrationData));

      expect(register.fulfilled.match(result)).toBe(true);

      expect(fetchMock).toHaveBeenCalledWith("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      expect(store.getState().auth).toEqual({
        user: testUser,
        isLoading: false,
        error: null,
      });
    });

    it("зберігає повідомлення про помилку реєстрації", async () => {
      const store = createTestStore();

      mockResponse({ message: "User already exists" }, false);

      const result = await store.dispatch(register(registrationData));

      expect(register.rejected.match(result)).toBe(true);

      expect(store.getState().auth).toEqual({
        user: null,
        isLoading: false,
        error: "User already exists",
      });
    });
  });

  describe("fetchCurrentUser", () => {
    it("завантажує поточного користувача", async () => {
      const store = createTestStore();

      mockResponse(testUser);

      const result = await store.dispatch(fetchCurrentUser());

      expect(fetchCurrentUser.fulfilled.match(result)).toBe(true);

      expect(fetchMock).toHaveBeenCalledWith("/api/auth/me");
      expect(store.getState().auth.user).toEqual(testUser);
    });

    it("очищає user, якщо користувач не авторизований", async () => {
      const store = createTestStore();

      // Спочатку користувач авторизований.
      mockResponse(testUser);
      await store.dispatch(login(loginData));

      expect(store.getState().auth.user).toEqual(testUser);

      // Сервер повертає помилку авторизації.
      mockResponse({}, false);

      const result = await store.dispatch(fetchCurrentUser());

      expect(fetchCurrentUser.rejected.match(result)).toBe(true);
      expect(store.getState().auth.user).toBeNull();
    });
  });

  describe("logout", () => {
    it("очищає користувача після успішного виходу", async () => {
      const store = createTestStore();

      mockResponse(testUser);
      await store.dispatch(login(loginData));

      expect(store.getState().auth.user).toEqual(testUser);

      mockResponse({});

      const result = await store.dispatch(logout());

      expect(logout.fulfilled.match(result)).toBe(true);

      expect(fetchMock).toHaveBeenCalledWith("/api/auth/logout", { method: "POST" });

      expect(store.getState().auth.user).toBeNull();
    });

    it("не очищає користувача при помилці logout", async () => {
      const store = createTestStore();

      mockResponse(testUser);
      await store.dispatch(login(loginData));

      mockResponse({}, false);

      const result = await store.dispatch(logout());

      expect(logout.rejected.match(result)).toBe(true);

      // Поточна реалізація не обробляє logout.rejected.
      expect(store.getState().auth.user).toEqual(testUser);
    });
  });
});
