import prisma from "@/prisma/prismaClient";

export default async function CharactersPage() {
  const characters = prisma.character.findMany({
    include: { fileNames: true },
  });
  return (
    <div className="card">
      <h1>Characters</h1>
    </div>
  );
}
