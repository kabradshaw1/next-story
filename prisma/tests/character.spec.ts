import { Prisma } from "@prisma/client";

import prisma from "../prismaClient";

describe("Character", () => {
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
      await prisma.role.deleteMany({});
      await prisma.organization.deleteMany({});
      await prisma.character.deleteMany({});
      await prisma.scene.deleteMany({});
      await prisma.fileName.deleteMany({});

      // Reset the ID sequences for all relevant tables
      await prisma.$executeRaw`ALTER SEQUENCE "Organization_id_seq" RESTART WITH 1`;
      await prisma.$executeRaw`ALTER SEQUENCE "Character_id_seq" RESTART WITH 1`;
      await prisma.$executeRaw`ALTER SEQUENCE "Role_id_seq" RESTART WITH 1`;
      await prisma.$executeRaw`ALTER SEQUENCE "FileName_id_seq" RESTART WITH 1`;
      await prisma.$executeRaw`ALTER SEQUENCE "Scene_id_seq" RESTART WITH 1`;
      console.log("Delete test characters after tests");
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
    const input: Prisma.CharacterCreateInput = {
      title: "title",
      text: "text",
      scene: { create: [{ title: "scene", timeline: 1 }] },
      fileNames: {
        create: [{ fileName: "example.png", discriminator: "character" }],
      },
      role: {
        create: [
          {
            title: "role",
            organization: {
              create: {
                title: "New Organization",
              },
            },
          },
        ],
      },
    };

    // when
    const character = await prisma.character.create({
      data: input,
      include: { fileNames: true, role: true, scene: true },
    });

    // then

    expect(character.id).toBe(1);
    expect(character.title).toBe("title");
    expect(character.text).toBe("text");
    expect(character.fileNames[0].fileName).toBe("example.png");
    expect(character.createdAt).toBeInstanceOf(Date);
    expect(character.role[0].organizationId).toBe(1);
    expect(character.role[0].title).toBe("role");
    expect(character.scene[0].title).toBe("scene");
    expect(character.scene[0].timeline).toBe(1);
  });

  it("givenExistingCharacters_whenFindMany_thenCharactersFound", async () => {
    // given character created in last test
    // when
    const characters = await prisma.character.findMany({
      include: {
        role: {
          select: {
            title: true,
            organization: {
              select: {
                title: true,
              },
            },
          },
        },
        scene: {
          select: {
            title: true,
          },
        },
        fileNames: {
          select: {
            fileName: true,
          },
        },
      },
    });

    // then
    expect(characters[0].title).toBe("title");
    expect(characters[0].text).toBe("text");
    expect(characters[0].fileNames[0].fileName).toBe("example.png");
    expect(characters[0].role[0].title).toBe("role");
    expect(characters[0].role[0].organization.title).toBe("New Organization");
    expect(characters[0].scene[0].title).toBe("scene");
  });
});
