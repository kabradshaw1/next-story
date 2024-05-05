import React from "react";

import prisma from "@/prisma/prismaClient";

import Characters from "./Characters";

const CharactersContainer: React.FC = async () => {
  const characters = await prisma.character.findMany({});
  return (
    <div className="w-full max-w-lg">
      <div className="card">
        <h1>Characters</h1>
        <Characters characters={characters} />
      </div>
    </div>
  );
};

export default function CharactersPage() {
  return <CharactersContainer />;
}
