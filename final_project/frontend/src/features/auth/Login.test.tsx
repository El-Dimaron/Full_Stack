import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";

import { Login } from "./Login";
import { login } from "./authSlice";
import { useAppDispatch } from "../../app/hooks";
import { successToast } from "../toast/custom_toast";

import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});

vi.mock("../../app/hooks", () => ({
  useAppDispatch: vi.fn(),
}));

vi.mock("./authSlice", () => ({
  login: vi.fn(),
}));

vi.mock("../toast/custom_toast", () => ({
  successToast: vi.fn(),
}));

describe("Login", () => {
  const dispatch = vi.fn();
  const unwrap = vi.fn();

  function renderLogin() {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<h1>Головна сторінка</h1>} />
          <Route path="/registration" element={<h1>Сторінка реєстрації</h1>} />
        </Routes>
      </MemoryRouter>,
    );
  }

  function fillForm() {
    fireEvent.change(screen.getByRole("textbox", { name: /email або логін/i }), {
      target: { value: "testuser" },
    });

    fireEvent.change(screen.getByLabelText("Пароль"), {
      target: { value: "Password123" },
    });
  }

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useAppDispatch).mockReturnValue(dispatch as unknown as ReturnType<typeof useAppDispatch>);

    dispatch.mockReturnValue({ unwrap });
    unwrap.mockResolvedValue({});

    vi.mocked(login).mockReturnValue({} as ReturnType<typeof login>);
  });

  it("відображає форму авторизації", () => {
    renderLogin();

    expect(screen.getByRole("heading", { name: "Вхід" })).toBeInTheDocument();

    expect(screen.getByRole("textbox", { name: /email або логін/i })).toBeInTheDocument();

    expect(screen.getByLabelText("Пароль")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Увійти" })).toBeInTheDocument();
  });

  it("передає правильні дані для авторизації", async () => {
    renderLogin();
    fillForm();

    fireEvent.click(screen.getByRole("button", { name: "Увійти" }));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        identifier: "testuser",
        password: "Password123",
      });
    });

    expect(dispatch).toHaveBeenCalledOnce();
    expect(unwrap).toHaveBeenCalledOnce();
  });

  it("після успішного входу показує toast і переходить на головну", async () => {
    renderLogin();
    fillForm();

    fireEvent.click(screen.getByRole("button", { name: "Увійти" }));

    expect(await screen.findByRole("heading", { name: "Головна сторінка" })).toBeInTheDocument();

    expect(successToast).toHaveBeenCalledWith("Ви успішно увійшли в акаунт.");
  });

  it("відображає помилку авторизації", async () => {
    unwrap.mockRejectedValue("Неправильний логін або пароль.");

    renderLogin();
    fillForm();

    fireEvent.click(screen.getByRole("button", { name: "Увійти" }));

    expect(await screen.findByText("Неправильний логін або пароль.")).toBeInTheDocument();

    expect(successToast).not.toHaveBeenCalled();
    expect(screen.queryByRole("heading", { name: "Головна сторінка" })).not.toBeInTheDocument();
  });

  it("відображає стандартну помилку, якщо сервер повернув Error", async () => {
    unwrap.mockRejectedValue(new Error("Network error"));

    renderLogin();
    fillForm();

    fireEvent.click(screen.getByRole("button", { name: "Увійти" }));

    expect(await screen.findByText("Не вдалося увійти. Перевірте введені дані.")).toBeInTheDocument();
  });

  it("не відправляє форму з порожнім паролем", () => {
    renderLogin();

    fireEvent.click(screen.getByRole("button", { name: "Увійти" }));

    expect(login).not.toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalled();
  });

  it("дозволяє перейти на сторінку реєстрації", () => {
    renderLogin();

    fireEvent.click(screen.getByRole("link", { name: "Зареєструватися" }));

    expect(screen.getByRole("heading", { name: "Сторінка реєстрації" })).toBeInTheDocument();
  });

  it("блокує форму під час авторизації", async () => {
    let resolveLogin!: (value: unknown) => void;

    unwrap.mockReturnValue(
      new Promise((resolve) => {
        resolveLogin = resolve;
      }),
    );

    renderLogin();
    fillForm();

    fireEvent.click(screen.getByRole("button", { name: "Увійти" }));

    const button = screen.getByRole("button", { name: "Вхід..." });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");

    expect(
      screen.getByRole("textbox", {
        name: /email або логін/i,
      }),
    ).toBeDisabled();

    expect(screen.getByLabelText("Пароль")).toBeDisabled();

    resolveLogin({});

    expect(
      await screen.findByRole("heading", {
        name: "Головна сторінка",
      }),
    ).toBeInTheDocument();
  });

  it("не надсилає повторний запит під час авторизації", async () => {
    let resolveLogin!: (value: unknown) => void;

    unwrap.mockReturnValue(
      new Promise((resolve) => {
        resolveLogin = resolve;
      }),
    );

    renderLogin();
    fillForm();

    const form = screen.getByRole("button", { name: "Увійти" }).closest("form")!;

    fireEvent.submit(form);
    fireEvent.submit(form);

    expect(login).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(1);

    resolveLogin({});

    await waitFor(() => {
      expect(successToast).toHaveBeenCalledOnce();
    });
  });

  it("розблоковує форму після помилки", async () => {
    let rejectLogin!: (reason: string) => void;

    unwrap.mockReturnValue(
      new Promise((_, reject) => {
        rejectLogin = reject;
      }),
    );

    renderLogin();
    fillForm();

    fireEvent.click(screen.getByRole("button", { name: "Увійти" }));

    expect(screen.getByRole("button", { name: "Вхід..." })).toBeDisabled();

    rejectLogin("Неправильний пароль.");

    expect(await screen.findByText("Неправильний пароль.")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Увійти" })).toBeEnabled();

    expect(screen.getByLabelText("Пароль")).toBeEnabled();
  });
});
