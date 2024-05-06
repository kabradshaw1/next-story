-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_characterId_fkey";

-- AlterTable
ALTER TABLE "Role" ALTER COLUMN "characterId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;
