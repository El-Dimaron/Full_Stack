import { useNavigate, NavLink } from "react-router";
import { useAppDispatch } from "../../app/hooks";
import { useState, type FormEvent } from "react";
import { login } from "./authSlice";

import "./auth.scss";
import { successToast } from "../toast/custom_toast";

export function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    try {
      await dispatch(
        login({
          identifier,
          password,
        }),
      ).unwrap();

      successToast("Ви успішно увійшли в акаунт.");

      navigate("/");
    } catch (error) {
      setError(typeof error === "string" ? error : "Не вдалося увійти. Перевірте введені дані.");
    }
  };
  return (
    <main className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1 className="auth-form__title">Вхід</h1>

        <p className="auth-form__subtitle">Увійдіть до свого облікового запису</p>

        <label className="auth-form__field">
          <span>Email або логін</span>

          <input
            type="text"
            name="identifier"
            autoComplete="username"
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            placeholder="Email або логін"
          />
        </label>

        <label className="auth-form__field">
          <span>Пароль</span>

          <input
            type="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Введіть пароль"
            required
          />
        </label>

        {error && <p className="auth-form__error">{error}</p>}

        <button className="auth-form__submit" type="submit">
          Увійти
        </button>

        <p className="auth-form__switch">
          Ще немає акаунта? <NavLink to="/registration">Зареєструватися</NavLink>
        </p>
      </form>
    </main>
  );
}
