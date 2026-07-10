import { useEffect, useState } from "react";
import axios from "axios";
import "./DataFetcher.css";
import { useParams } from "react-router";

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
};

type Params = {
  characterID?: string;
};

function getRandomCharacterId() {
  return Math.ceil(Math.random() * 826);
}

async function fetchCharacter(characterID: number): Promise<Character> {
  const response = await axios.get(`https://rickandmortyapi.com/api/character/${characterID}`);

  return response.data;
}

export function MessageComponent() {
  const [message, setMessage] = useState<Character | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [randomCharacterID, setRandomCharacterID] = useState(() => getRandomCharacterId());

  const { characterID } = useParams<Params>();

  const finalCharacterID = characterID ? Number(characterID) : randomCharacterID;

  useEffect(() => {
    async function loadCharacter() {
      try {
        setLoading(true);
        setError(null);

        const character = await fetchCharacter(finalCharacterID);
        setMessage(character);
      } catch {
        setMessage(null);
        setError("Character not found");
      } finally {
        setLoading(false);
      }
    }

    loadCharacter();
  }, [finalCharacterID]);

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
      <button className="random-button" onClick={() => setRandomCharacterID(getRandomCharacterId())}>
        Randomize character
      </button>
    </>
  );
}
