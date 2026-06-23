import { use } from "react";

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
};

const randomNum = Math.ceil(Math.random() * 826) + 1;

export async function fetchCharacter(charID = randomNum): Promise<Character> {
  const response = await fetch(`https://rickandmortyapi.com/api/character/${charID}`);

  if (!response.ok) {
    throw new Error(`Character not found. Status: ${response.status}`);
  }

  const character = await response.json();

  return character;
}

type MessageComponentProps = {
  messagePromise: Promise<Character>;
};

export function MessageComponent({ messagePromise }: MessageComponentProps) {
  const message = use(messagePromise);
  return (
    <div>
      <h2>{message.name}</h2>
      <p>{message.status}</p>
      <p>{message.species}</p>
      <img src={message.image} alt={message.name} />
    </div>
  );
}
