import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { useState } from "react";
import styles from "./Like.module.css";

export function Like() {
  const [status, setStatus] = useState(false);

  function handleClick() {
    setStatus(!status);
    console.log("You have a small pipi");
  }

  if (status) return <FaHeart className={styles.likeButton} onClick={handleClick} />;
  return <FaHeartBroken className={styles.likeButton} onClick={handleClick} />;
}
