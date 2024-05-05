import prisma from "@/prisma/prismaClient";
export default async function ScenesPage() {
  const scenes = await prisma.scene.findMany();
  return <div>Scenes</div>;
}
