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
      await prisma.character.deleteMany({});
      await prisma.$disconnect();
      console.log("Test database has been cleaned up");
    } catch (error) {
      console.error(error);
    }
  });

  describe("create", () => {
    afterEach(async () => {
      try {
        await prisma.character.deleteMany({});
      } catch (error) {
        console.error(error);
      }
    });
    it("givenProperlyFormatted_whenCreate_thenCharacterCreated", async () => {
      // given
      const input: Prisma.CharacterCreateInput = {
        title: "title",
        text: "text",
      };
      // when
      const character = await prisma.character.create({ data: input });
      // then
      expect(character).toBeDefined();
      expect(character.id).toHaveProperty("id");
      expect(character.title).toBe("title");
      expect(character.text).toBe(null);
      expect(character.createdAt).toBeInstanceOf(Date);
    });
  });
});
