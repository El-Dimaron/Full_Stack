import { addItem, addItems, removeItem, removeItems, type Item } from "./itemSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { NavLink } from "react-router";
import { getPaginationPages } from "./pagination";
import placeholder_image_svg from "../../assets/images/test_image.svg";
import "./items.scss";
import { useEffect, useState } from "react";
import { testItems } from "./testItems";

type ItemPageProps = {
  onSuccess: (message: string) => void;
};

export function ItemPage({ onSuccess }: ItemPageProps) {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.items.list);

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
        image: placeholder_image_svg,
      }),
    );
  };

  const handleAddTestItems = () => {
    dispatch(addItems(testItems));
  };

  const handleRemoveItem = (item: Item) => {
    dispatch(removeItem(item.id));
    console.log(item.id);
    onSuccess(`Успішно видалено: ${item.name}`);
  };

  const handleRemoveItems = () => {
    dispatch(removeItems());
    onSuccess(`Усі товари успішно видалено`);
  };

  return (
    <>
      <div className="test-buttons">
        <NavLink className="create-item-button" to="/create-item">
          <svg className="create-item-button__icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Додати товар
        </NavLink>

        <button aria-label="Add item button" className="create-item-button" onClick={handleAddTestItem}>
          <svg className="create-item-button__icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Додати тестовий товар
        </button>

        <button aria-label="Add item button" className="create-item-button" onClick={handleAddTestItems}>
          <svg className="create-item-button__icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Додати тестові товари
        </button>

        <button aria-label="Add item button" className="create-item-button" onClick={handleRemoveItems}>
          <svg className="create-item-button__icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
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
            <div className="item-card__image-container">
              {item.image !== placeholder_image_svg ? (
                <img className="item-card__image" src={item.image} alt={item.name} />
              ) : (
                <div className="item-card__image item-card__placeholder" aria-label="Placeholder image" />
              )}
            </div>

            <div className="item-card__info">
              <div className="item-card__header">
                <h2 className="item-card__title">{item.name}</h2>

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
                <p className="item-card__price">{item.price} грн.</p>

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
