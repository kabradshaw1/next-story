import Lists from "@/components/main/Lists";
import prisma from "@/prisma/prismaClient";

export default async function CharactersPage() {
  const characters = await prisma.character.findMany({
    include: { fileNames: true },
  });
  const props = characters.map((character) => ({
    title: character.title, // Assuming `title` directly comes from character
    text: character.text, // Assuming `text` directly comes from character
    imageUrl:
      character.fileNames.length > 0
        ? character.fileNames[0].fileName
        : undefined, // Assuming the first file name is the image URL
  }));
  return (
    <div className="card">
      <h1>Characters</h1>
      <Lists props={props} route="characters" />
    </div>
  );
}
