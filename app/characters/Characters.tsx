"use client";
import React from "react"; // Ensure React is imported if using JSX

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
          <div key={character.id} className="card">
            <h1>{character.title}</h1>
            <p>{character.text || "No text available"}</p>
            <Link className="btn" href={`${character.title}`}>
              View Details
            </Link>
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
