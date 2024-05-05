import React from "react"; // Ensure React is imported if using JSX

import { Character } from "@prisma/client";
import { useRouter } from "next/navigation";

interface CharactersProps {
  characters: Character[];
}

const Characters: React.FC<CharactersProps> = ({ characters }) => {
  const router = useRouter();
  const route = (characterId: number) => () =>
    router.push(`/character/${characterId}`);

  return (
    <>
      {characters.length > 0 ? (
        characters.map((character) => (
          <div key={character.id} className="card">
            <h1>{character.title}</h1>
            <p>{character.text || "No text available"}</p>
            <button className="btn" onClick={route(character.id)}>
              View Details
            </button>
          </div>
        ))
      ) : (
        <div className="card">
          <h1>No characters found.</h1>
        </div>
      )}
    </>
  );
};

export default Characters;
