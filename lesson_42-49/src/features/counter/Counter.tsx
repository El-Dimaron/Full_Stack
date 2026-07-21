import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { increment, decrement } from "./counterSlice";

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="counter-card">
      <p className="counter-title">Redux Counter</p>

      <div className="counter-controls">
        <button className="counter-button" aria-label="Decrease counter" onClick={() => dispatch(decrement())}>
          −
        </button>

        <span className="counter-value">{count}</span>

        <button className="counter-button" aria-label="Increase counter" onClick={() => dispatch(increment())}>
          +
        </button>
      </div>
    </div>
  );
}
