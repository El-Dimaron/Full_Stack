import { addItem, addItems, removeItem, removeItems, type Item } from "./itemSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { NavLink } from "react-router";
import { getPaginationPages } from "./pagination";
import placeholderImage from "../../assets/images/test_image.svg";
import "./items.scss";
import { useEffect, useState } from "react";
import { testItems } from "./testItems";
import { removeToast, successToast } from "../../components/toast/custom_toast";
import { FiPlus } from "react-icons/fi";

export function ItemPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.items.list);

  function getDiscountedPrice(price: number, discount: number) {
    if (!discount) {
      return price;
    }

    return Math.round(price * (1 - discount / 100));
  }

  const searchQuery = useAppSelector((state) => state.items.searchQuery);

  const normalizedQuery = searchQuery.toLowerCase().trim();

  const filteredItems = searchQuery
    ? items.filter((item) => {
        return item.name.toLowerCase().includes(normalizedQuery);
      })
    : items;

  const Items_Per_Page = 24;

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredItems.length / Items_Per_Page);

  const firstItemIndex = Items_Per_Page * (currentPage - 1);
  const lastItemIndex = firstItemIndex + Items_Per_Page;

  const currentItems = filteredItems.slice(firstItemIndex, lastItemIndex);

  const paginationPages = getPaginationPages(currentPage, totalPages);

  const handleAddTestItem = () => {
    dispatch(
      addItem({
        name: "Нова футболка",
        description: "Базова бавовняна футболка",
        price: 799,
        discount: 10,
        availability: "In stock",
        sizes: ["S", "M", "L"],
        colors: ["Black", "White"],
        image: placeholderImage,
      }),
    );
    successToast("Тестовий товар успішно додано");
  };

  const handleAddTestItems = () => {
    dispatch(addItems(testItems));
    successToast(`Тестові товари (${testItems.length} штук) успішно додані`);
  };

  const handleRemoveItem = (item: Item) => {
    dispatch(removeItem(item.id));
    removeToast(`Успішно видалено: ${item.name}`);
  };

  const handleRemoveItems = () => {
    if (!items.length) {
      return;
    }

    dispatch(removeItems());
    removeToast("Усі товари успішно видалено");
  };

  return (
    <>
      <div className="test-buttons">
        <NavLink className="create-item-button" to="/create-item">
          <FiPlus className="create-item-button__icon" aria-hidden="true" />
          Додати товар
        </NavLink>

        <button aria-label="Add item button" className="create-item-button" onClick={handleAddTestItem}>
          <FiPlus className="create-item-button__icon" aria-hidden="true" />
          Додати тестовий товар
        </button>

        <button aria-label="Add item button" className="create-item-button" onClick={handleAddTestItems}>
          <FiPlus className="create-item-button__icon" aria-hidden="true" />
          Додати тестові товари
        </button>

        <button aria-label="Add item button" className="create-item-button" onClick={handleRemoveItems}>
          <FiPlus className="create-item-button__icon" aria-hidden="true" />
          Видалити всі товари
        </button>
      </div>

      <div className="items-meta">
        <div className="items-summary">
          {searchQuery ? (
            <>
              Знайдено {filteredItems.length} товарів за запитом <strong>«{searchQuery}»</strong>
            </>
          ) : (
            <>Всього товарів: {items.length}</>
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination__current-page">
            Сторінка {currentPage} з {totalPages}
          </div>
        )}
      </div>
      <ul className="items-list">
        {currentItems.map((item) => (
          <li className="item-card" key={item.id}>
            <NavLink className="item-card__image-link" to={`/item/${item.id}`}>
              <div className="item-card__image-container">
                {item.image !== placeholderImage ? (
                  <img className="item-card__image" src={item.image} alt={item.name} />
                ) : (
                  <div
                    className="item-card__image item-card__placeholder"
                    aria-label="Placeholder image"
                    style={{
                      WebkitMaskImage: `url(${placeholderImage})`,
                      maskImage: `url(${placeholderImage})`,
                    }}
                  />
                )}
              </div>
            </NavLink>

            <div className="item-card__info">
              <div className="item-card__header">
                <h2 className="item-card__title">
                  <NavLink className="item-card__title-link" to={`/item/${item.id}`}>
                    {item.name}
                  </NavLink>
                </h2>

                <span
                  className={`item-card__availability ${
                    item.availability === "In stock"
                      ? "item-card__availability--available"
                      : item.availability === "Preorder"
                        ? "item-card__availability--preorder"
                        : "item-card__availability--unavailable"
                  }`}
                >
                  {item.availability === "In stock" && "В наявності"}
                  {item.availability === "Preorder" && "Передзамовлення"}
                  {item.availability === "Out of stock" && "Немає в наявності"}
                </span>
              </div>

              <div className="item-card__meta">
                <p className="item-card__sizes">{item.sizes.join(" ")}</p>

                <p className="item-card__colors">{item.colors.join(", ")}</p>
              </div>

              <div className="item-card__footer">
                <div className="item-card__price-container">
                  <div className="item-card__prices">
                    {item.discount > 0 && <p className="item-card__old-price">{item.price} грн.</p>}

                    <p className="item-card__price">{getDiscountedPrice(item.price, item.discount)} грн.</p>
                  </div>

                  {item.discount > 0 && <span className="item-card__discount">-{item.discount}%</span>}
                </div>

                <div className="item-card__actions">
                  <NavLink className="item-card__edit" to={`/update-item/${item.id}`}>
                    Редагувати
                  </NavLink>

                  <button className="item-card__remove" type="button" onClick={() => handleRemoveItem(item)}>
                    Видалити
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination__button"
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((current) => current - 1)}
          >
            ←
          </button>

          {paginationPages.map((page, index) => {
            if (page === "...") {
              return (
                <span className="pagination__dots" key={`dots-${index}`}>
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                className={`pagination__button ${currentPage === page ? "pagination__button--active" : ""}`}
                type="button"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            );
          })}

          <button
            className="pagination__button"
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((current) => current + 1)}
          >
            →
          </button>
        </div>
      )}
    </>
  );
}
