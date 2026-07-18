import { fetchJoke } from "./JokesSlice";
// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";

export function Jokes() {
  const dispatch = useDispatch<AppDispatch>();
  const { joke, isLoading, error } = useSelector((state: RootState) => state.jokes);

  const handleGenerateJoke = () => {
    dispatch(fetchJoke());
  };

  return (
    <div className="character-card">
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {joke && <p>{joke}</p>}

      <button className="random-button" onClick={handleGenerateJoke} disabled={isLoading}>
        {isLoading ? "Loading..." : "Generate a joke"}
      </button>
    </div>
  );
}
