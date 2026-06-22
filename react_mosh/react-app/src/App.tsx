import { Message } from "./Message";
// import { ListGroup } from "./components/ListGroup";
import { CustomButton } from "./components/CustomButton/CustomButton";
import Alert from "./components/Alert";
import { useState } from "react";
import { Like } from "./components/Like/Like";

export default function App() {
  // const items = ["Kyiv", "Paris", "Tokyo", "New York", "Warsaw"];
  // const handleSelectItem = (item: string) => {
  // console.log(item);
  // };
  const [alertVisible, setAlertVisible] = useState(false);

  const handleClose = () => {
    setAlertVisible(false);
  };

  const handleClick = () => {
    setAlertVisible(true);
  };

  return (
    <div>
      <Message />
      {/* <ListGroup items={items} heading="Cities" onSelectItem={handleSelectItem} /> */}
      {/* <Alert>
        Hello <span>World</span>
      </Alert> */}
      <CustomButton onClick={handleClick}>Button</CustomButton>
      {alertVisible && (
        <Alert onClose={handleClose}>
          Hello <span>World</span>
        </Alert>
      )}
      <Like />
    </div>
  );
}
