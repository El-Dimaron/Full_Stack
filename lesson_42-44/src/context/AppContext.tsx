import { createContext } from "react";

export type ThemeType = "dark" | "light";

export type ThemeContextType = {
  theme: ThemeType;
  setTheme: React.Dispatch<React.SetStateAction<ThemeType>>;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);
