import { Message } from "./Message";
import { ListGroup } from "./components/ListGroup";
import { CustomButton } from "./components/CustomButton/CustomButton";
import { useState } from "react";
import { Like } from "./components/Like/Like";

export default function App() {
  const [cart, setCart] = useState({
    discount: 0.1,
    items: [
      { id: 1, title: "Product 1", quantity: 1 },
      { id: 2, title: "Product 2", quantity: 1 },
    ],
  });

  const handleClick = () => {
    setCart({ ...cart, items: cart.items.map((item) => (item.id === 1 ? { ...item, quantity: 2 } : item)) });
  };

  return (
    <div>
      <Message />
      <ListGroup items={cart.items} heading={"Cart items: " + cart.items.length} />
      <CustomButton onClick={handleClick}>Button</CustomButton>

      <Like />
    </div>
  );
}
