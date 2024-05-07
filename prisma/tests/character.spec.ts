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
      await prisma.characterRoles.deleteMany({});

      // Reset the ID sequences for all relevant tables
      await prisma.$executeRaw`ALTER SEQUENCE "Organization_id_seq" RESTART WITH 1`;
      await prisma.$executeRaw`ALTER SEQUENCE "Character_id_seq" RESTART WITH 1`;
      await prisma.$executeRaw`ALTER SEQUENCE "Role_id_seq" RESTART WITH 1`;
      await prisma.$executeRaw`ALTER SEQUENCE "FileName_id_seq" RESTART WITH 1`;
      await prisma.$executeRaw`ALTER SEQUENCE "Scene_id_seq" RESTART WITH 1`;
      await prisma.$executeRaw`ALTER SEQUENCE "CharacterRoles_id_seq" RESTART WITH 1`;
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
    const scene = await prisma.scene.create({
      data: { title: "scene", timeline: 1 },
    });

    const organization = await prisma.organization.create({
      data: { title: "New Organization" },
    });

    const role = await prisma.role.create({
      data: {
        title: "role",
        organizationId: organization.id,
      },
    });

    const input: Prisma.CharacterCreateInput = {
      title: "title",
      text: "text",
      scenes: { connect: { id: scene.id } },
      fileNames: {
        create: [{ fileName: "example.png", discriminator: "character" }],
      },
      roles: {
        connect: [{ id: role.id }],
      },
    };

    const character = await prisma.character.create({
      data: input,
      include: {
        fileNames: true,
        roles: {
          include: {
            role: {
              select: {
                title: true,
                organization: { select: { title: true } },
              },
            },
          },
        },
        scenes: true,
      },
    });

    expect(character.id).toBeDefined();
    expect(character.title).toBe("title");
    expect(character.text).toBe("text");
    expect(character.fileNames[0].fileName).toBe("example.png");
    expect(character.createdAt).toBeInstanceOf(Date);
    expect(character.roles[0].role).toBe(role.title);
    expect(character.scenes[0].title).toBe(scene.title);
    expect(character.scenes[0].timeline).toBe(1);
    expect(character.roles[0].role.organization.title).toBe("New Organization");
  });
});
