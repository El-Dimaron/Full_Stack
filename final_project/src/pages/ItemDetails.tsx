import { Navigate, NavLink, useParams } from "react-router";
import { useAppSelector } from "../app/hooks";
import placeholderImage from "../assets/images/test_image.svg";
import "../features/items/items.scss";

export function ItemDetails() {
  const { itemId } = useParams();

  const id = Number(itemId);

  const item = useAppSelector((state) => state.items.list.find((item) => item.id === id));

  if (!item) {
    return <Navigate to="/404" replace />;
  }

  const hasCustomImage = item.image !== placeholderImage;
  console.log(item.image, placeholderImage);
  console.log(hasCustomImage);

  const discountedPrice = item.discount > 0 ? Math.round(item.price * (1 - item.discount / 100)) : item.price;

  return (
    <section className="item-details">
      <NavLink className="item-details__back" to="/shop">
        ← Назад до магазину
      </NavLink>

      <div className="item-details__card">
        <div className="item-details__image-container">
          {hasCustomImage ? (
            <img className="item-details__image" src={item.image} alt={item.name} />
          ) : (
            <div
              className="item-details__placeholder"
              aria-label="Placeholder image"
              style={{
                WebkitMaskImage: `url(${placeholderImage})`,
                maskImage: `url(${placeholderImage})`,
              }}
            />
          )}
        </div>

        <div className="item-details__content">
          <div className="item-details__header">
            <div>
              <p className="item-details__id">Товар #{item.id}</p>

              <h1 className="item-details__title">{item.name}</h1>
            </div>

            <span
              className={`item-details__availability ${
                item.availability === "In stock"
                  ? "item-details__availability--available"
                  : item.availability === "Preorder"
                    ? "item-details__availability--preorder"
                    : "item-details__availability--unavailable"
              }`}
            >
              {item.availability === "In stock" && "В наявності"}

              {item.availability === "Preorder" && "Передзамовлення"}

              {item.availability === "Out of stock" && "Немає в наявності"}
            </span>
          </div>

          <p className="item-details__description">{item.description || "Опис товару відсутній."}</p>

          <div className="item-details__section">
            <p className="item-details__section-title">Розміри</p>

            <div className="item-details__options">
              {item.sizes.map((size) => (
                <span className="item-details__option" key={size}>
                  {size}
                </span>
              ))}
            </div>
          </div>

          <div className="item-details__section">
            <p className="item-details__section-title">Кольори</p>

            <div className="item-details__options">
              {item.colors.map((color) => (
                <span className="item-details__option" key={color}>
                  {color}
                </span>
              ))}
            </div>
          </div>

          <div className="item-details__price-container">
            <div>
              {item.discount > 0 && <p className="item-details__old-price">{item.price} грн.</p>}

              <p className="item-details__price">{discountedPrice} грн.</p>
            </div>

            {item.discount > 0 && <span className="item-details__discount">-{item.discount}%</span>}
          </div>

          <div className="item-details__actions">
            <NavLink className="item-details__edit" to={`/update-item/${item.id}`}>
              Редагувати товар
            </NavLink>

            <button className="item-details__cart" type="button" disabled={item.availability === "Out of stock"}>
              Додати в кошик
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
