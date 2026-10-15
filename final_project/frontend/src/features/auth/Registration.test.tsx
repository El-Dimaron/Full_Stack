import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";

import { Registration } from "./Registration";
import { register } from "./authSlice";
import { useAppDispatch } from "../../app/hooks";
import { errorToast, successToast } from "../toast/custom_toast";

import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

vi.mock("../../app/hooks", () => ({
  useAppDispatch: vi.fn(),
}));

vi.mock("./authSlice", () => ({
  register: vi.fn(),
}));

vi.mock("../toast/custom_toast", () => ({
  errorToast: vi.fn(),
  successToast: vi.fn(),
}));

describe("Registration", () => {
  const dispatch = vi.fn();
  const unwrap = vi.fn();

  const fetchMock = vi.fn();

  function mockAvailability(loginAvailable = true, emailAvailable = true) {
    fetchMock.mockImplementation(async (input: string | URL | Request) => {
      const url = String(input);

      return {
        ok: true,
        json: async () => ({
          loginAvailable: url.includes("login=") ? loginAvailable : undefined,
          emailAvailable: url.includes("email=") ? emailAvailable : undefined,
        }),
      };
    });
  }

  function renderRegistration() {
    render(
      <MemoryRouter initialEntries={["/registration"]}>
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/" element={<h1>Головна сторінка</h1>} />
          <Route path="/login" element={<h1>Сторінка входу</h1>} />
        </Routes>
      </MemoryRouter>,
    );
  }

  function fillForm({
    login = "testuser",
    email = "test@example.com",
    password = "Password123",
    confirmPassword = "Password123",
  } = {}) {
    fireEvent.change(screen.getByRole("textbox", { name: "Логін" }), {
      target: { value: login },
    });

    fireEvent.change(screen.getByRole("textbox", { name: "Email" }), {
      target: { value: email },
    });

    fireEvent.change(screen.getByLabelText("Пароль", { exact: true }), {
      target: { value: password },
    });

    fireEvent.change(screen.getByLabelText("Повторіть пароль"), {
      target: { value: confirmPassword },
    });
  }

  function submitForm() {
    fireEvent.click(screen.getByRole("button", { name: "Зареєструватися" }));
  }

  beforeEach(() => {
    vi.clearAllMocks();

    vi.stubGlobal("fetch", fetchMock);
    mockAvailability();

    vi.mocked(useAppDispatch).mockReturnValue(dispatch as unknown as ReturnType<typeof useAppDispatch>);

    dispatch.mockReturnValue({ unwrap });
    unwrap.mockResolvedValue({});

    vi.mocked(register).mockReturnValue({} as ReturnType<typeof register>);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("відображає всі поля реєстрації", () => {
    renderRegistration();

    expect(screen.getByRole("heading", { name: "Реєстрація" })).toBeInTheDocument();

    expect(screen.getByRole("textbox", { name: "Логін" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Email" })).toBeInTheDocument();
    expect(screen.getByLabelText("Пароль", { exact: true })).toBeInTheDocument();
    expect(screen.getByLabelText("Повторіть пароль")).toBeInTheDocument();
  });

  it("успішно реєструє користувача", async () => {
    renderRegistration();
    fillForm();
    submitForm();

    await waitFor(() => {
      expect(register).toHaveBeenCalledWith({
        login: "testuser",
        email: "test@example.com",
        password: "Password123",
      });
    });

    expect(dispatch).toHaveBeenCalledOnce();
    expect(unwrap).toHaveBeenCalledOnce();

    expect(successToast).toHaveBeenCalledWith("Акаунт успішно створено.");

    expect(await screen.findByRole("heading", { name: "Головна сторінка" })).toBeInTheDocument();
  });

  it("нормалізує login та email перед відправленням", async () => {
    renderRegistration();

    fillForm({
      login: "  testuser  ",
      email: "  TEST@EXAMPLE.COM  ",
    });

    submitForm();

    await waitFor(() => {
      expect(register).toHaveBeenCalledWith({
        login: "testuser",
        email: "test@example.com",
        password: "Password123",
      });
    });
  });

  it("не реєструє користувача із зайнятим логіном", async () => {
    mockAvailability(false, true);

    renderRegistration();
    fillForm();
    submitForm();

    expect(await screen.findByText("Користувач з таким логіном вже існує.")).toBeInTheDocument();

    expect(register).not.toHaveBeenCalled();
  });

  it("не реєструє користувача із зайнятим email", async () => {
    mockAvailability(true, false);

    renderRegistration();
    fillForm();
    submitForm();

    expect(await screen.findByText("Користувач з таким email вже існує.")).toBeInTheDocument();

    expect(register).not.toHaveBeenCalled();
  });

  it("відхиляє логін із забороненими символами", async () => {
    renderRegistration();

    fillForm({ login: "test user" });
    submitForm();

    await waitFor(() => {
      expect(errorToast).toHaveBeenCalledWith("Логін може містити лише латинські літери, цифри, ., _ та -.");
    });

    expect(register).not.toHaveBeenCalled();
  });

  it("відхиляє пароль без цифр", async () => {
    renderRegistration();

    fillForm({
      password: "PasswordOnly",
      confirmPassword: "PasswordOnly",
    });

    submitForm();

    await waitFor(() => {
      expect(errorToast).toHaveBeenCalledWith("Пароль має містити хоча б одну цифру.");
    });

    expect(register).not.toHaveBeenCalled();
  });

  it("відхиляє реєстрацію, якщо паролі не збігаються", async () => {
    renderRegistration();

    fillForm({ confirmPassword: "Different123" });
    submitForm();

    await waitFor(() => {
      expect(errorToast).toHaveBeenCalledWith("Паролі не співпадають.");
    });

    expect(register).not.toHaveBeenCalled();
  });

  it("показує помилку, якщо register відхиляється", async () => {
    unwrap.mockRejectedValue("Помилка реєстрації.");

    renderRegistration();
    fillForm();
    submitForm();

    await waitFor(() => {
      expect(errorToast).toHaveBeenCalledWith("Помилка реєстрації.");
    });

    expect(successToast).not.toHaveBeenCalled();
  });

  it("дозволяє перейти на сторінку входу", () => {
    renderRegistration();

    fireEvent.click(screen.getByRole("link", { name: "Увійти" }));

    expect(screen.getByRole("heading", { name: "Сторінка входу" })).toBeInTheDocument();
  });

  it("блокує форму під час реєстрації", async () => {
    let resolveRegister!: (value: unknown) => void;

    unwrap.mockReturnValue(
      new Promise((resolve) => {
        resolveRegister = resolve;
      }),
    );

    renderRegistration();
    fillForm();
    submitForm();

    const button = await screen.findByRole("button", {
      name: "Реєстрація...",
    });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");

    expect(screen.getByRole("textbox", { name: "Логін" })).toBeDisabled();

    expect(screen.getByRole("textbox", { name: "Email" })).toBeDisabled();

    await waitFor(() => {
      expect(register).toHaveBeenCalledOnce();
    });

    resolveRegister({});

    expect(
      await screen.findByRole("heading", {
        name: "Головна сторінка",
      }),
    ).toBeInTheDocument();
  });

  it("не надсилає повторну реєстрацію", async () => {
    let resolveRegister!: (value: unknown) => void;

    unwrap.mockReturnValue(
      new Promise((resolve) => {
        resolveRegister = resolve;
      }),
    );

    renderRegistration();
    fillForm();

    const form = screen.getByRole("button", { name: "Зареєструватися" }).closest("form")!;

    fireEvent.submit(form);
    fireEvent.submit(form);

    await waitFor(() => {
      expect(register).toHaveBeenCalledTimes(1);
    });

    resolveRegister({});

    await waitFor(() => {
      expect(successToast).toHaveBeenCalledOnce();
    });
  });

  it("розблоковує форму, якщо логін уже зайнятий", async () => {
    mockAvailability(false, true);

    renderRegistration();
    fillForm();
    submitForm();

    expect(await screen.findByText("Користувач з таким логіном вже існує.")).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Зареєструватися",
      }),
    ).toBeEnabled();

    expect(register).not.toHaveBeenCalled();
  });
});
