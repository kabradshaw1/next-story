import exp from "constants";

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
      await prisma.$disconnect();
      console.log("Test database has been cleaned up");
    } catch (error) {
      console.error(error);
    }
  });

  describe("create", () => {
    afterEach(async () => {
      try {
        // Delete records from all relevant tables
        await prisma.role.deleteMany({});
        await prisma.organization.deleteMany({});
        await prisma.character.deleteMany({});
        await prisma.fileName.deleteMany({});

        // Reset the ID sequences for all relevant tables
        await prisma.$executeRaw`ALTER SEQUENCE "Organization_id_seq" RESTART WITH 1`;
        await prisma.$executeRaw`ALTER SEQUENCE "Character_id_seq" RESTART WITH 1`;
        await prisma.$executeRaw`ALTER SEQUENCE "Role_id_seq" RESTART WITH 1`;
        await prisma.$executeRaw`ALTER SEQUENCE "FileName_id_seq" RESTART WITH 1`;
        console.log("Delete existing characters after tests");
      } catch (error) {
        console.error(error);
      }
    });

    it("givenProperlyFormatted_whenCreate_thenCharacterCreated", async () => {
      // given
      const input: Prisma.CharacterCreateInput = {
        title: "title",
        text: "text",
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
        include: { fileNames: true, role: true },
      });

      // then
      expect(character).toBeDefined();
      expect(character.id).toBe(1);
      expect(character.title).toBe("title");
      expect(character.text).toBe("text");
      expect(character.fileNames).toBeDefined();
      expect(character.fileNames[0].fileName).toBe("example.png");
      expect(character.createdAt).toBeInstanceOf(Date);
    });
  });
});
