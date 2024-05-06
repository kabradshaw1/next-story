"use client";
import prisma from "@/prisma/prismaClient";
import StoreProvider from "../StoreProvider";
import Ex from "@/components/main/Items/Ex";
import Items from "@/components/main/Items/Items";

export default async function ScenesPage() {
  // const scenes = await prisma.scene.findMany();
  return (
    <StoreProvider>
      <Ex />
      <Items />
    </StoreProvider>
  );
}
