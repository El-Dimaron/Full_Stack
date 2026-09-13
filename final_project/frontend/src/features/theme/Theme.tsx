import { saveTheme, type ThemeType } from "./themeSlice";
import dayIcon from "../../assets/images/day-icon.png";
import nightIcon from "../../assets/images/night-icon.png";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

export function Theme() {
  const theme: ThemeType = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  function handleThemeChange() {
    const newTheme = theme === "light" ? "dark" : "light";

    dispatch(saveTheme(newTheme));
  }

  return (
    <>
      <button className="header__theme-button" onClick={handleThemeChange}>
        <img className="theme-icon" src={theme === "dark" ? nightIcon : dayIcon} alt="Mode switcher" />
      </button>
    </>
  );
}
