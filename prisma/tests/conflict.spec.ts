import { Prisma } from "@prisma/client";

import prisma from "../prismaClient";

describe("Conflict", () => {
  beforeAll(async () => {
    try {
      await prisma.$connect();
      console.log("Connected to the database");
    } catch (error) {
      console.error(error);
    }
  });

  afterAll(async () => {
    try {
      // Delete records from all relevant tables
      await prisma.organization.deleteMany({});
      await prisma.scene.deleteMany({});
      await prisma.fileName.deleteMany({});

      // Reset the ID sequences for all relevant tables
      await prisma.$executeRaw`ALTER SEQUENCE "Organization_id_seq" RESTART WITH 1`;
      await prisma.$executeRaw`ALTER SEQUENCE "FileName_id_seq" RESTART WITH 1`;
      await prisma.$executeRaw`ALTER SEQUENCE "Scene_id_seq" RESTART WITH 1`;
      console.log("Delete test conflicts after tests");
    } catch (error) {
      console.error(error);
    }
    try {
      await prisma.$disconnect();
      console.log("Test database has been cleaned up");
    } catch (error) {
      console.error(error);
    }
  });

  it("givenProperlyFormatted_whenCreate_thenCharacterCreated", async () => {
    // given
    const input: Prisma.ConflictCreateInput = {
      title: "title",
      text: "text",
      scene: { create: [{ title: "scene", timeline: 1 }] },
      organization: { create: [{ title: "org 1" }, { title: "org 2" }] },
      fileNames: {
        create: [{ fileName: "example.png", discriminator: "organization" }],
      },
    };

    // when
    const conflict = await prisma.conflict.create({
      data: input,
      include: { scene: true, organization: true, fileNames: true },
    });
    // then
    expect(conflict.title).toBe("title");
    expect(conflict.text).toBe("text");
    expect(conflict.scene[0].title).toBe("scene");
    expect(conflict.scene[0].timeline).toBe(1);
    expect(conflict.organization[0].title).toBe("org 1");
    expect(conflict.organization[1].title).toBe("org 2");
    expect(conflict.fileNames[0].fileName).toBe("example.png");
    expect(conflict.fileNames[0].discriminator).toBe("organization");
  });
  it("givenExistingConflict_whenFindMany_thenConflictFound", async () => {
    //given conflict made in create test
    //when
    const conflicts = await prisma.conflict.findMany({
      include: { scene: true, organization: true, fileNames: true },
    });
    //then
    expect(conflicts[0].title).toBe("title");
    expect(conflicts[0].text).toBe("text");
    expect(conflicts[0].scene[0].title).toBe("scene");
    expect(conflicts[0].scene[0].timeline).toBe(1);
    expect(conflicts[0].organization[0].title).toBe("org 1");
    expect(conflicts[0].organization[1].title).toBe("org 2");
    expect(conflicts[0].fileNames[0].fileName).toBe("example.png");
    expect(conflicts[0].fileNames[0].discriminator).toBe("organization");
  });
});
