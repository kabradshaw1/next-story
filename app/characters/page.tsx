import prisma from "@/prisma/prismaClient";

import Lists from "../../components/main/Lists";

export default async function CharactersPage() {
  const characters = await prisma.character.findMany({
    include: { fileNames: true },
  });

  return (
    <div className="w-full max-w-lg">
      <div className="card">
        <h1>Characters</h1>
        {/* <Lists props={characters} route="characters" /> */}
      </div>
    </div>
  );
}
