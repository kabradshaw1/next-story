-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scene" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT,
    "timeline" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Scene_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Population" (
    "id" SERIAL NOT NULL,
    "population" INTEGER NOT NULL,
    "shipId" INTEGER NOT NULL,
    "sceneId" INTEGER NOT NULL,

    CONSTRAINT "Population_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT,
    "locationId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hierarchy" (
    "id" SERIAL NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "structure" JSONB NOT NULL,

    CONSTRAINT "Hierarchy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "shipId" INTEGER,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ship" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conflict" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Conflict_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FileName" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT NOT NULL,
    "characterId" INTEGER,
    "sceneId" INTEGER,
    "locationId" INTEGER,
    "shipId" INTEGER,
    "conflictId" INTEGER,
    "organizationId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "discriminator" TEXT NOT NULL,

    CONSTRAINT "FileName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CharacterToScene" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_OrganizationToScene" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_LocationToScene" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_LocationToOrganization" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ConflictToScene" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ConflictToOrganization" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Character_title_key" ON "Character"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Scene_title_key" ON "Scene"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Population_shipId_key" ON "Population"("shipId");

-- CreateIndex
CREATE UNIQUE INDEX "Population_sceneId_key" ON "Population"("sceneId");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_title_key" ON "Organization"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_locationId_key" ON "Organization"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "Hierarchy_organizationId_key" ON "Hierarchy"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Location_title_key" ON "Location"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Ship_title_key" ON "Ship"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Conflict_title_key" ON "Conflict"("title");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterToScene_AB_unique" ON "_CharacterToScene"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterToScene_B_index" ON "_CharacterToScene"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationToScene_AB_unique" ON "_OrganizationToScene"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationToScene_B_index" ON "_OrganizationToScene"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LocationToScene_AB_unique" ON "_LocationToScene"("A", "B");

-- CreateIndex
CREATE INDEX "_LocationToScene_B_index" ON "_LocationToScene"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LocationToOrganization_AB_unique" ON "_LocationToOrganization"("A", "B");

-- CreateIndex
CREATE INDEX "_LocationToOrganization_B_index" ON "_LocationToOrganization"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ConflictToScene_AB_unique" ON "_ConflictToScene"("A", "B");

-- CreateIndex
CREATE INDEX "_ConflictToScene_B_index" ON "_ConflictToScene"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ConflictToOrganization_AB_unique" ON "_ConflictToOrganization"("A", "B");

-- CreateIndex
CREATE INDEX "_ConflictToOrganization_B_index" ON "_ConflictToOrganization"("B");

-- AddForeignKey
ALTER TABLE "Population" ADD CONSTRAINT "Population_shipId_fkey" FOREIGN KEY ("shipId") REFERENCES "Ship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Population" ADD CONSTRAINT "Population_sceneId_fkey" FOREIGN KEY ("sceneId") REFERENCES "Scene"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hierarchy" ADD CONSTRAINT "Hierarchy_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_shipId_fkey" FOREIGN KEY ("shipId") REFERENCES "Ship"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileName" ADD CONSTRAINT "FileName_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileName" ADD CONSTRAINT "FileName_sceneId_fkey" FOREIGN KEY ("sceneId") REFERENCES "Scene"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileName" ADD CONSTRAINT "FileName_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileName" ADD CONSTRAINT "FileName_shipId_fkey" FOREIGN KEY ("shipId") REFERENCES "Ship"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileName" ADD CONSTRAINT "FileName_conflictId_fkey" FOREIGN KEY ("conflictId") REFERENCES "Conflict"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileName" ADD CONSTRAINT "FileName_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToScene" ADD CONSTRAINT "_CharacterToScene_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToScene" ADD CONSTRAINT "_CharacterToScene_B_fkey" FOREIGN KEY ("B") REFERENCES "Scene"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToScene" ADD CONSTRAINT "_OrganizationToScene_A_fkey" FOREIGN KEY ("A") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToScene" ADD CONSTRAINT "_OrganizationToScene_B_fkey" FOREIGN KEY ("B") REFERENCES "Scene"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationToScene" ADD CONSTRAINT "_LocationToScene_A_fkey" FOREIGN KEY ("A") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationToScene" ADD CONSTRAINT "_LocationToScene_B_fkey" FOREIGN KEY ("B") REFERENCES "Scene"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationToOrganization" ADD CONSTRAINT "_LocationToOrganization_A_fkey" FOREIGN KEY ("A") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LocationToOrganization" ADD CONSTRAINT "_LocationToOrganization_B_fkey" FOREIGN KEY ("B") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConflictToScene" ADD CONSTRAINT "_ConflictToScene_A_fkey" FOREIGN KEY ("A") REFERENCES "Conflict"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConflictToScene" ADD CONSTRAINT "_ConflictToScene_B_fkey" FOREIGN KEY ("B") REFERENCES "Scene"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConflictToOrganization" ADD CONSTRAINT "_ConflictToOrganization_A_fkey" FOREIGN KEY ("A") REFERENCES "Conflict"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConflictToOrganization" ADD CONSTRAINT "_ConflictToOrganization_B_fkey" FOREIGN KEY ("B") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
