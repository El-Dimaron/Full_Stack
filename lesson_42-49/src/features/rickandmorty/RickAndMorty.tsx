import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../app/store";
import { fetchCharacter, getRandomCharacterId } from "./rickAndMortySlice";
import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router";
import "./RickAndMorty.scss";

const DEFAULT_CHARACTER_ID = 1;

type RouteParams = {
  characterID?: string;
};

export function RickAndMorty() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { character, isLoading, error } = useSelector((state: RootState) => state.rickAndMorty);

  const { characterID: characterIDFromURL } = useParams<RouteParams>();

  const parsedCharacterID = Number(characterIDFromURL);

  const isValidCharacterID = Number.isInteger(parsedCharacterID) && parsedCharacterID >= 1 && parsedCharacterID <= 826;

  const currentCharacterID = isValidCharacterID ? parsedCharacterID : (character?.id ?? DEFAULT_CHARACTER_ID);

  const [characterID, setCharacterID] = useState(String(currentCharacterID));

  useEffect(() => {
    setCharacterID(String(currentCharacterID));

    if (character?.id !== currentCharacterID) {
      dispatch(fetchCharacter(currentCharacterID));
    }

    console.log(`Character ID: ${currentCharacterID}`);
  }, [currentCharacterID, character?.id, dispatch]);

  const handleSumbit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const id = Number(characterID);

    if (!Number.isInteger(id) || id < 1 || id > 826) {
      return;
    }

    navigate(`/rickandmorty/${id}`);
  };

  const handleLoadCharacter = () => {
    const randomID = getRandomCharacterId();

    setCharacterID(String(randomID));

    navigate(`/rickandmorty/${randomID}`);
  };

  return (
    <>
      <div className="character-card">
        {isLoading && <p>Завантаження...</p>}

        {error && <p>{error}</p>}

        {character && (
          <>
            <img className="character-image" src={character.image} alt={character.name} />
            <h2 className="character-title">{character.name}</h2>
            <p className="character-description">Status: {character.status}</p>
            <p className="character-description">Species: {character.species}</p>
          </>
        )}
        <div className="character-interactive">
          <form className="character-form" onSubmit={handleSumbit}>
            <input
              className="character-input"
              type="number"
              min={1}
              max={826}
              value={characterID}
              onChange={(event) => {
                console.log(event.target.value);
                setCharacterID(event.target.value);
              }}
              placeholder="Enter character ID"
            />
            <button className="load-button" type="submit">
              Load
            </button>
          </form>
          <button className="random-button" onClick={handleLoadCharacter}>
            Randomize character
          </button>
        </div>
      </div>
    </>
  );
}
