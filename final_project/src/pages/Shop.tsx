import { useLocation, useNavigate } from "react-router";
import { ItemPage } from "../features/items/ItemPage";
import { useEffect, useState } from "react";

type LocationState = {
  message?: string;
};

export const Shop = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = (location.state as LocationState) || null;

  const [message, setMessage] = useState(state?.message ?? "");

  useEffect(() => {
    if (!message) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setMessage("");
    }, 3000);

    navigate(location.pathname, { replace: true, state: null });

    return () => clearTimeout(timeoutId);
  }, [message, navigate, location.pathname]);

  return (
    <>
      {message && (
        <div className="toast toast--success" role="status">
          <svg className="toast__icon" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="m5 12 4 4L19 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span>{message}</span>
        </div>
      )}

      {/* <div className="toast toast--success" role="status">
        <svg className="toast__icon" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="m5 12 4 4L19 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span>{"Товар успішно створено"}</span>
      </div> */}

      <ItemPage onSuccess={setMessage} />
    </>
  );
};
