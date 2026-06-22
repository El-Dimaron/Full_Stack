import { useState } from "react";

interface Props {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

export function ListGroup({ items, heading, onSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h2>{heading}</h2>
      {items.length === 0 && <p>No items found</p>}
      <ul className="list-group">
        {items.map((item, index) => {
          return (
            <li
              key={item}
              onClick={() => {
                setSelectedIndex(index);
                onSelectItem(item);
              }}
              className={selectedIndex === index ? "list-group-item active" : "list-group-item"}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </>
  );
}
