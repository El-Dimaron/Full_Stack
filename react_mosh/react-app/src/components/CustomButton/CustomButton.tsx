import styles from "./CustomButton.module.css";

type Color = "blue" | "gray" | "green" | "red" | "yellow" | "magenta" | "light" | "black" | "transparent";

interface Props {
  color?: Color;
  children: string;
  onClick: () => void;
}

// export function CustomButton({ color = "black", children, onClick }: Props) {
//   const colorRelation = {
//     blue: "primary",
//     gray: "secondary",
//     green: "success",
//     red: "danger",
//     yellow: "warning",
//     magenta: "info",
//     light: "light",
//     black: "dark",
//     transparent: "link",
//   };

//   // const buttonColor: string = colorRelation[color];

//   return (
//     // <button className={"btn btn-" + buttonColor} onClick={onClick}>
//     //   {children}
//     // </button>
//     <button className={styles.customButton} onClick={onClick}>
//       {children}
//     </button>
//   );
// }

export function CustomButton({ children, onClick }: Props) {
  return (
    <button className={styles.customButton} onClick={onClick}>
      {children}
    </button>
  );
}
