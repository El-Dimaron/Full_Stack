import { useState, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router";

export function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const result = await dispatch(
      login({
        email,
        password,
      }),
    );

    if (login.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>

      <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" />

      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
      />

      {error && <p>{error}</p>}

      <button disabled={isLoading}>{isLoading ? "Loading..." : "Login"}</button>
    </form>
  );
}
