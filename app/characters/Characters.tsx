import React from "react";

import { Character } from "@prisma/client";
import Link from "next/link";

interface CharactersProps {
  characters: Character[];
}

const Characters: React.FC<CharactersProps> = ({ characters }) => {
  return (
    <>
      {characters.length > 0 ? (
        characters.map((character) => (
          <Link
            href={`${character.title}`}
            key={character.id}
            className="card link"
          >
            <h1>{character.title}</h1>
            <p>{character.text || "No text available"}</p>
          </Link>
        ))
      ) : (
        <div className="card">
          <h1>No characters found.</h1>
          <Link href="/characters" className="button">
            Return to Characters
          </Link>
          <Link href="/" className="button">
            Return to Home Page
          </Link>
        </div>
      )}
    </>
  );
};

export default Characters;
