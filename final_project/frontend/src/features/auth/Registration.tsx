import { NavLink, useNavigate } from "react-router";
import { useAppDispatch } from "../../app/hooks";
import { useRef, useState, type FormEvent } from "react";
import { register } from "./authSlice";
import { errorToast, successToast } from "../toast/custom_toast";

function validateLogin(login: string) {
  const normalizedLogin = login.trim();

  if (normalizedLogin.length < 3) {
    return "Логін має містити щонайменше 3 символи.";
  }

  if (normalizedLogin.length > 30) {
    return "Логін не може містити більше 30 символів.";
  }

  if (!/^[A-Za-z0-9._-]+$/.test(normalizedLogin)) {
    return "Логін може містити лише латинські літери, цифри, ., _ та -.";
  }

  return null;
}

function validateEmail(email: string) {
  const normalizedEmail = email.trim();

  if (normalizedEmail.length > 254) {
    return "Email не може містити більше 254 символів.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return "Введіть коректний email.";
  }

  return null;
}

function validatePassword(password: string) {
  if (password.length < 8) {
    return "Пароль має містити щонайменше 8 символів.";
  }

  if (password.length > 72) {
    return "Пароль не може містити більше 72 символів.";
  }

  if (!/\d/.test(password)) {
    return "Пароль має містити хоча б одну цифру.";
  }

  return null;
}

export function Registration() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const [loginError, setLoginError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittingRef = useRef(false);

  const passwordRequirements = [
    {
      label: "Щонайменше 8 символів",
      valid: password.length >= 8,
    },

    {
      label: "Хоча б одна цифра",
      valid: /\d/.test(password),
    },
  ];

  const checkLoginAvailability = async () => {
    const normalizedLogin = login.trim();

    if (normalizedLogin.length < 3) {
      return false;
    }

    try {
      const response = await fetch(`/api/auth/check-availability?login=${encodeURIComponent(normalizedLogin)}`);

      if (!response.ok) {
        return true;
      }

      const data = await response.json();

      if (!data.loginAvailable) {
        setLoginError("Користувач з таким логіном вже існує.");

        return false;
      }

      setLoginError("");

      return true;
    } catch {
      return true;
    }
  };

  const checkEmailAvailability = async () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      return false;
    }

    try {
      const response = await fetch(`/api/auth/check-availability?email=${encodeURIComponent(normalizedEmail)}`);

      if (!response.ok) {
        return true;
      }

      const data = await response.json();

      if (!data.emailAvailable) {
        setEmailError("Користувач з таким email вже існує.");

        return false;
      }

      setEmailError("");

      return true;
    } catch {
      return true;
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submittingRef.current) return;

    const loginValidationError = validateLogin(login);

    if (loginValidationError) {
      errorToast(loginValidationError);
      return;
    }

    const emailValidationError = validateEmail(email);

    if (emailValidationError) {
      errorToast(emailValidationError);
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);

    try {
      const [isLoginAvailable, isEmailAvailable] = await Promise.all([
        checkLoginAvailability(),
        checkEmailAvailability(),
      ]);

      if (!isLoginAvailable || !isEmailAvailable) {
        return;
      }

      const passwordValidationError = validatePassword(password);

      if (passwordValidationError) {
        errorToast(passwordValidationError);
        return;
      }

      if (password !== confirmPassword) {
        errorToast("Паролі не співпадають.");
        return;
      }

      await dispatch(
        register({
          login: login.trim(),
          email: email.trim().toLowerCase(),
          password,
        }),
      ).unwrap();

      successToast("Акаунт успішно створено.");
      navigate("/");
    } catch (error) {
      errorToast(typeof error === "string" ? error : "Не вдалося зареєструватися.");
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1 className="auth-form__title">Реєстрація</h1>

        <p className="auth-form__subtitle">Створіть новий обліковий запис</p>

        <label className="auth-form__field">
          <span>Логін</span>

          <input
            type="text"
            name="username"
            autoComplete="username"
            disabled={isSubmitting}
            value={login}
            onChange={(event) => {
              setLogin(event.target.value);
              setLoginError("");
            }}
            onBlur={checkLoginAvailability}
            minLength={3}
            maxLength={30}
            placeholder="Ваш логін"
            required
          />

          {loginError && <span className="auth-form__field-error">{loginError}</span>}
        </label>

        <label className="auth-form__field">
          <span>Email</span>

          <input
            type="email"
            name="email"
            autoComplete="email"
            disabled={isSubmitting}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setEmailError("");
            }}
            onBlur={checkEmailAvailability}
            maxLength={254}
            placeholder="email@example.com"
            required
          />
          {emailError && <span className="auth-form__field-error">{emailError}</span>}
        </label>

        <label className="auth-form__field">
          <span>Пароль</span>

          <input
            type="password"
            name="password"
            autoComplete="new-password"
            disabled={isSubmitting}
            value={password}
            onChange={(event) => {
              const value = event.target.value;

              setPassword(value);

              if (confirmPassword && confirmPassword !== value) {
                setPasswordMatchError("Паролі не співпадають.");
              } else {
                setPasswordMatchError("");
              }
            }}
            placeholder="Введіть пароль"
            minLength={8}
            maxLength={72}
            required
          />

          {password.length > 0 && (
            <ul className="password-requirements">
              {passwordRequirements.map((requirement) => (
                <li
                  key={requirement.label}
                  className={
                    requirement.valid ? "password-requirement password-requirement--valid" : "password-requirement"
                  }
                >
                  <span className="password-requirement__icon">{requirement.valid ? "✓" : "-"}</span>

                  {requirement.label}
                </li>
              ))}
            </ul>
          )}
        </label>

        <label className="auth-form__field">
          <span>Повторіть пароль</span>

          <input
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            disabled={isSubmitting}
            value={confirmPassword}
            onChange={(event) => {
              const value = event.target.value;

              setConfirmPassword(value);

              if (value && value !== password) {
                setPasswordMatchError("Паролі не співпадають.");
              } else {
                setPasswordMatchError("");
              }
            }}
            placeholder="Повторіть пароль"
            minLength={8}
            maxLength={72}
            required
          />
        </label>

        {passwordMatchError && <span className="auth-form__field-error">{passwordMatchError}</span>}

        <button className="auth-form__submit" type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
          {isSubmitting ? "Реєстрація..." : "Зареєструватися"}
        </button>

        <p className="auth-form__switch">
          Вже маєте акаунт? <NavLink to="/login">Увійти</NavLink>
        </p>
      </form>
    </main>
  );
}
