/*
  Warnings:

  - A unique constraint covering the columns `[fileName]` on the table `FileName` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FileName_fileName_key" ON "FileName"("fileName");
