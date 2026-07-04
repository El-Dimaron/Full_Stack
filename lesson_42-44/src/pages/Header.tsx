import { NavLink } from "react-router";
import "../App.css";
import dayIcon from "../assets/day-icon.png";
import nightIcon from "../assets/night-icon.png";
import { useContext } from "react";
import { ThemeContext } from "../context/AppContext";

export function Header() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("Something's wrong with the context. Fix it!");
  }

  const { theme, setTheme } = context;

  const handleClick = () => {
    console.log(theme);
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };
  return (
    <>
      <header>
        <nav className="nav">
          <ul className="navList">
            <li className="navItem">
              <NavLink className={({ isActive }) => (isActive ? "navLink navLinkActive" : "navLink")} to="/">
                Home
              </NavLink>
            </li>
            <li className="navItem">
              <NavLink
                className={({ isActive }) => (isActive ? "navLink navLinkActive" : "navLink")}
                to="/rickandmorty"
              >
                Rick and Morty
              </NavLink>
            </li>
            <li className="navItem">
              <NavLink className={({ isActive }) => (isActive ? "navLink navLinkActive" : "navLink")} to="/jokes">
                Jokes
              </NavLink>
            </li>
            <li className="navItem">
              <NavLink className={({ isActive }) => (isActive ? "navLink navLinkActive" : "navLink")} to="/about">
                About
              </NavLink>
            </li>
            <li className="navItem">
              <NavLink className={({ isActive }) => (isActive ? "navLink navLinkActive" : "navLink")} to="/contacts">
                Contacts
              </NavLink>
            </li>
            <li className="navItem">
              <button className="header__theme-button" onClick={handleClick}>
                <img className="theme-icon" src={theme === "dark" ? nightIcon : dayIcon} alt="Mode switcher" />
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
