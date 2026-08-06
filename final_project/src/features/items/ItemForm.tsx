import { type Item, type NewItem, addItem, updateItem } from "./itemSlice";
import { useAppDispatch } from "../../app/hooks";
import { useState, type FormEvent } from "react";
import "./items.scss";
import { useNavigate } from "react-router";
import { successToast } from "../../components/toast/custom_toast";

const initialFormState: NewItem = {
  name: "",
  description: "",
  price: 0,
  discount: 0,
  availability: "In stock",
  sizes: [],
  colors: [],
  image: "",
};

type ItemFormProps = {
  item?: Item;
};

export function ItemForm({ item }: ItemFormProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<NewItem>(item ?? initialFormState);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      return;
    }

    if (formData.price <= 0) {
      return;
    }

    const preparedItem = { ...formData, name: formData.name.trim(), description: formData.description.trim() };

    if (item) {
      dispatch(updateItem({ id: item.id, ...preparedItem }));
      navigate("/shop", {
        replace: true,
      });
      successToast(`Успішно оновлено: ${preparedItem.name}`);
    } else {
      dispatch(addItem(preparedItem));
      navigate("/shop", { replace: true });
      successToast(`Успішно створено: ${formData.name.trim()}`);
    }
  };

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <h2 className="item-form__title">{item ? "Редагування товару" : "Створення товару"}</h2>

      <label className="item-form__field">
        <span>Назва товару</span>

        <input
          type="text"
          value={formData.name}
          onChange={(event) =>
            setFormData((currentData) => ({
              ...currentData,
              name: event.target.value,
            }))
          }
          placeholder="Худі 2026"
          required
        />
      </label>

      <label className="item-form__field">
        <span>Зображення товару</span>

        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            const file = event.currentTarget.files?.[0];
            console.log(file);

            if (!file) {
              return;
            }

            const imageUrl = URL.createObjectURL(file);

            setFormData((currentData) => ({ ...currentData, image: imageUrl }));
          }}
        />

        {formData.image && (
          <div className="item-form__image-preview">
            <img src={formData.image} alt="Попередній перегляд товару" />
          </div>
        )}
      </label>

      <label className="item-form__field">
        <span>Опис</span>

        <textarea
          value={formData.description}
          onChange={(event) =>
            setFormData((currentData) => ({
              ...currentData,
              description: event.target.value,
            }))
          }
          placeholder="Опис товару"
          rows={2}
        />
      </label>

      <label className="item-form__field">
        <span>Ціна</span>

        <input
          type="number"
          min="0"
          step="0.01"
          value={formData.price || ""}
          onChange={(event) =>
            setFormData((currentData) => ({
              ...currentData,
              price: Number(event.target.value),
            }))
          }
          required
        />
      </label>

      <label className="item-form__field">
        <span>Знижка, %</span>

        <input
          type="number"
          min="0"
          max="100"
          value={formData.discount || ""}
          onChange={(event) =>
            setFormData((currentData) => ({
              ...currentData,
              discount: Number(event.target.value),
            }))
          }
        />
      </label>

      <label className="item-form__field">
        <span>Наявність</span>

        <select
          value={formData.availability}
          onChange={(event) =>
            setFormData((currentData) => ({
              ...currentData,
              availability: event.target.value,
            }))
          }
        >
          <option value="In stock">В наявності</option>
          <option value="Out of stock">Немає в наявності</option>
          <option value="Preorder">Передзамовлення</option>
        </select>
      </label>

      <label className="item-form__field">
        <span>Розміри</span>

        <select
          multiple
          value={formData.sizes}
          onChange={(event) => {
            const selectedSizes = Array.from(event.currentTarget.selectedOptions, (option) => option.value);

            setFormData((currentData) => ({
              ...currentData,
              sizes: selectedSizes,
            }));
          }}
        >
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>

        <small>Утримуй Ctrl або Cmd, щоб вибрати декілька значень</small>
      </label>

      <label className="item-form__field">
        <span>Кольори</span>

        <select
          multiple
          value={formData.colors}
          onChange={(event) => {
            const selectedColors = Array.from(event.currentTarget.selectedOptions, (option) => option.value);

            setFormData((currentData) => ({
              ...currentData,
              colors: selectedColors,
            }));
          }}
        >
          <option value="Black">Чорний</option>
          <option value="White">Білий</option>
          <option value="Red">Червоний</option>
          <option value="Green">Зелений</option>
          <option value="Blue">Синій</option>
        </select>

        <small>Утримуй Ctrl або Cmd, щоб вибрати декілька значень</small>
      </label>

      <button className="item-form__submit" type="submit">
        {item ? "Зберегти зміни" : "Створити товар"}
      </button>
    </form>
  );
}
