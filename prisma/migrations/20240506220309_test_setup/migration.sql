/*
  Warnings:

  - You are about to drop the column `sceneEndId` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `sceneStartId` on the `Role` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_characterId_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_sceneEndId_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_sceneStartId_fkey";

-- DropIndex
DROP INDEX "Role_sceneEndId_key";

-- DropIndex
DROP INDEX "Role_sceneStartId_key";

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "sceneEndId",
DROP COLUMN "sceneStartId";

-- CreateTable
CREATE TABLE "CharacterRoles" (
    "id" SERIAL NOT NULL,
    "characterId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "CharacterRoles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CharacterRolesToScene" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterRolesToScene_AB_unique" ON "_CharacterRolesToScene"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterRolesToScene_B_index" ON "_CharacterRolesToScene"("B");

-- AddForeignKey
ALTER TABLE "CharacterRoles" ADD CONSTRAINT "CharacterRoles_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterRoles" ADD CONSTRAINT "CharacterRoles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterRolesToScene" ADD CONSTRAINT "_CharacterRolesToScene_A_fkey" FOREIGN KEY ("A") REFERENCES "CharacterRoles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterRolesToScene" ADD CONSTRAINT "_CharacterRolesToScene_B_fkey" FOREIGN KEY ("B") REFERENCES "Scene"("id") ON DELETE CASCADE ON UPDATE CASCADE;
