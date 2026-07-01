import { useEffect, useState } from "react";
import axios from "axios";
import "./DataFetcher.css";

async function fetchJoke(): Promise<string> {
  const response = await axios.get("https://v2.jokeapi.dev/joke/Programming?format=txt");

  return response.data;
}

export function JokesComponent() {
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadJoke() {
      try {
        const joke = await fetchJoke();
        setMessage(joke);
      } catch {
        setError("Joke not found");
      } finally {
        setLoading(false);
      }
    }

    loadJoke();
  }, []);

  if (isLoading) {
    return <p>Is loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!message) {
    return null;
  }

  return (
    <>
      <div className="character-card">
        <p>{message}</p>
      </div>
    </>
  );
}
