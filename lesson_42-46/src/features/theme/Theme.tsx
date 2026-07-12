import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { toggle } from "./themeSlice";
import dayIcon from "../../assets/day-icon.png";
import nightIcon from "../../assets/night-icon.png";

export function Theme() {
  const theme = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

  return (
    <>
      <button className="header__theme-button" onClick={() => dispatch(toggle())}>
        <img className="theme-icon" src={theme === "dark" ? nightIcon : dayIcon} alt="Mode switcher" />
      </button>
    </>
  );
}
