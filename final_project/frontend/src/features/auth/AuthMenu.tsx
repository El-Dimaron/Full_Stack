import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";

import { useAppDispatch } from "../../app/hooks";
import { logout } from "./authSlice";

import "./authMenu.scss";

export function AuthMenu({ user }: { user: { login: string } | null }) {
  const dispatch = useAppDispatch();

  const defaultGuestName = "Гість";
  const defaultLoginName = "Увійти";
  const defaultRegisterName = "Зареєструватись";

  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="auth-menu" ref={menuRef}>
      <button className="auth-menu__trigger" onClick={() => setIsOpen((prev) => !prev)} aria-expanded={isOpen}>
        <span>{user ? user.login : defaultGuestName}</span>

        <span className={`auth-menu__arrow ${isOpen ? "open" : ""}`}>▾</span>
      </button>

      {isOpen && (
        <div className="auth-menu__dropdown">
          {user ? (
            <button
              className="auth-menu__item auth-menu__item--button"
              onClick={() => {
                dispatch(logout());
                setIsOpen(false);
              }}
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/login" className="auth-menu__item" onClick={() => setIsOpen(false)}>
                {defaultLoginName}
              </NavLink>

              <NavLink to="/registration" className="auth-menu__item" onClick={() => setIsOpen(false)}>
                {defaultRegisterName}
              </NavLink>
            </>
          )}
        </div>
      )}
    </div>
  );
}
