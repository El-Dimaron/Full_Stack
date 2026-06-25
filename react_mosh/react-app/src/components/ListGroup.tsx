import { useState } from "react";

interface Props {
  // items: string[];
  items: {
    id: number;
    title: string;
    quantity: number;
  }[];

  heading: string;
}

export function ListGroup({ items, heading }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h2>{heading}</h2>
      {items.length === 0 && <p>No items found</p>}
      <ul className="list-group">
        {items.map((item, index) => {
          return (
            <li
              key={item.id}
              onClick={() => {
                setSelectedIndex(index);
              }}
              className={selectedIndex === index ? "list-group-item active" : "list-group-item"}
            >
              {item.id} - {item.title} [{item.quantity}]
            </li>
          );
        })}
      </ul>
    </>
  );
}
