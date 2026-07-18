import { NavLink } from "react-router";
import "../App.css";
import { Theme } from "../features/theme/Theme";

export function Header() {
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
              <NavLink className={({ isActive }) => (isActive ? "navLink navLinkActive" : "navLink")} to="/forms">
                Forms
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
              <Theme />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
