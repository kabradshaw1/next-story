import { Character } from "@prisma/client";

import prisma from "@/prisma/prismaClient";

export async function GET(): Promise<Character[]> {
  return await prisma.character.findMany({});
}
