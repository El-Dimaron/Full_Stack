import { Navigate, useParams } from "react-router";
import { ItemForm } from "../features/items/ItemForm";
import { useAppSelector } from "../app/hooks";

export const UpdateItem = () => {
  const { itemId } = useParams();

  const id = Number(itemId);

  const item = useAppSelector((state) => {
    return state.items.list.find((item) => item.id === id);
  });

  if (!item) {
    return <Navigate to={"/shop"} replace />;
  }

  return (
    <>
      <ItemForm item={item} />
    </>
  );
};
