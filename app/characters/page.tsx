import prisma from "@/prisma/prismaClient";

import Characters from "./Characters";

export default async function CharactersPage() {
  const characters = await prisma.character.findMany();
  return (
    <div className="w-full max-w-lg">
      <div className="card">
        <h1>Characters</h1>
        <Characters characters={characters} />
      </div>
    </div>
  );
}
