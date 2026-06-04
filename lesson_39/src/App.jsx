import "./App.css";
import { useState } from "react";

export function StatelessTitle({ name }) {
  if (!name) {
    return <h1>Hello, Ryan Gosling! </h1>;
  }
  return <h1>Hello, {name}! </h1>;
}

export function LoginLogout() {
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  const status = isLoggedIn ? "in" : "out";

  function handleClick() {
    setIsLoggedIn((prevState) => !prevState);
  }

  return (
    <>
      <span>You are logged {status}</span>
      <button className="button-main" onClick={handleClick}>
        {isLoggedIn ? "Logout" : "Login"}
      </button>
    </>
  );
}
