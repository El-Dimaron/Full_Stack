import "./header.scss";
import logo_svg from "../assets/images/bd_logo.svg";
import { useEffect, useState, type SubmitEvent } from "react";
import { NavLink } from "react-router";
import { Theme } from "../features/theme/Theme";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setSearchQuery } from "../features/items/itemSlice";

export function Header() {
  const searchQuery = useAppSelector((state) => state.items.searchQuery);
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!inputValue.trim()) {
      dispatch(setSearchQuery(""));
      return;
    }

    const timeoutId = setTimeout(() => {
      dispatch(setSearchQuery(inputValue.trim()));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [inputValue, dispatch]);

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    console.log(`Submitted: ${searchQuery}`);
  };

  return (
    <div className="page">
      <header className="header">
        <div className="header__upper">
          <ul className="nav">
            <li className="nav-item">
              <NavLink className="nav-logo-link" to="/">
                <svg className="nav-logo">
                  <use href={logo_svg}></use>
                </svg>
              </NavLink>
            </li>
            <li className="nav-item">
              <form className="search-form" onSubmit={handleSubmit}>
                <input
                  className="search-input"
                  type="text"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.currentTarget.value)}
                  placeholder="Пошук"
                />
                <button className="search-button" type="submit" aria-label="Пошук">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </form>
            </li>
            <li className="nav-item">
              <button className="cart-button" type="button" aria-label="Cart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="cart-icon"
                >
                  <circle cx="9" cy="20" r="1.5" />
                  <circle cx="18" cy="20" r="1.5" />
                  <path d="M3 4h2l2.4 10.2a1 1 0 0 0 1 .8h9.7a1 1 0 0 0 1-.8L21 7H7" />
                </svg>
              </button>
            </li>
            <li className="nav-item">
              <Theme />
            </li>
          </ul>
        </div>
        <div className="header__lower">
          <ul className="nav__lower">
            <li className="nav-item__lower">
              <NavLink className="nav-logo-link" to="/">
                Головна
              </NavLink>
            </li>
            <li className="nav-item__lower">
              <NavLink className="nav-logo-link" to="shop">
                Магазин
              </NavLink>
            </li>
            <li className="nav-item__lower">
              <NavLink className="nav-logo-link" to="contacts">
                Контакти
              </NavLink>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
