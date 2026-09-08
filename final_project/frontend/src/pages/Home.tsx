import "./home.scss";

export function Home() {
  return (
    <section className="home-page">
      <div className="home-card">
        <div className="home-card__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path
              d="M4 20h16M6 20l1-10h10l1 10M9 10V6h6v4M8 14h8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p className="home-card__label">Bondini Team</p>

        <h1 className="home-card__title">Under Construction</h1>

        <p className="home-card__description">
          Ця сторінка наразі знаходиться в розробці. Скоро тут зʼявиться щось цікаве.
        </p>
      </div>
    </section>
  );
}
