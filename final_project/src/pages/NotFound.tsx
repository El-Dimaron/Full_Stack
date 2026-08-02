import cat404 from "../assets/images/sad_cat.png";
import { NavLink } from "react-router";
import "./notFound.scss";

export function NotFound() {
  return (
    <section className="not-found-page">
      <div className="not-found-card">
        <img className="not-found-card__image" src={cat404} alt="Confused cat" />

        <p className="not-found-card__code">404</p>

        <h1 className="not-found-card__title">Page not found</h1>

        <p className="not-found-card__description">Схоже, ця сторінка загубилась десь по дорозі.</p>

        <NavLink className="not-found-card__button" to="/">
          Повернутись на головну
        </NavLink>
      </div>
    </section>
  );
}
