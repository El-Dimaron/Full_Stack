import { useEffect, useState } from "react";
import axios from "axios";
import "./DataFetcher.css";

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
};

type MessageComponentProps = {
  characterID?: number;
};

const randomNum = Math.ceil(Math.random() * 826);

async function fetchCharacter(characterID: number): Promise<Character> {
  const response = await axios.get(`https://rickandmortyapi.com/api/character/${characterID}`);

  return response.data;
}

export function MessageComponent({ characterID = randomNum }: MessageComponentProps) {
  const [message, setMessage] = useState<Character | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCharacter() {
      try {
        const character = await fetchCharacter(characterID);
        setMessage(character);
      } catch {
        setError("Character not found");
      } finally {
        setLoading(false);
      }
    }

    setTimeout(() => loadCharacter(), 1000);

    // loadCharacter();
  }, [characterID]);

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
        <img className="character-image" src={message.image} alt={message.name} />

        <div className="character-info">
          <h2>{message.name}</h2>
          <p>
            <span>Status:</span> {message.status}
          </p>
          <p>
            <span>Species:</span> {message.species}
          </p>
        </div>
      </div>
    </>
  );
}
