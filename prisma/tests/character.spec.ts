import prisma from "../prismaClient";

describe("Character", () => {
  beforeAll(async () => {
    await prisma.$connect();
    console.log("Connected to the database");
  });

  beforeEach(async () => {
    // Setup character data here for independent tests
    const scene = await prisma.scene.create({
      data: { title: "scene", timeline: 1, user: "test" },
    });

    const organization = await prisma.organization.create({
      data: { title: "New Organization", user: "test" },
    });

    const role = await prisma.role.create({
      data: {
        title: "role",
        organizationId: organization.id,
        user: "test",
      },
    });

    await prisma.character.create({
      data: {
        title: "title",
        text: "text",
        user: "test",
        scenes: { connect: { id: scene.id } },
        fileNames: {
          create: [
            {
              fileName: "example.png",
              discriminator: "character",
              user: "test",
            },
          ],
        },
        roles: {
          create: [
            {
              role: { connect: { id: role.id } },
              Scene: { connect: { id: scene.id } },
              user: "test",
            },
          ],
        },
      },
      include: {
        fileNames: true,
        scenes: true,
        roles: {
          include: {
            role: {
              include: {
                organization: true, // Include organization details within the role
              },
            },
          },
        },
      },
    });
  });

  afterEach(async () => {
    // Clean up data after each test
    await prisma.characterRoles.deleteMany({});
    await prisma.fileName.deleteMany({});
    await prisma.character.deleteMany({});
    await prisma.role.deleteMany({});
    await prisma.scene.deleteMany({});
    await prisma.organization.deleteMany({});
  });

  afterAll(async () => {
    await prisma.$disconnect();
    console.log("Prisma client disconnected");
  });

  it("givenExistingCharacter_whenFindAll_thenCharactersFound", async () => {
    // when
    const characters = await prisma.character.findMany({
      include: {
        fileNames: true,
        scenes: true,
        roles: {
          include: {
            role: {
              include: {
                organization: true, // Include organization details
              },
            },
          },
        },
      },
    });
    // then
    expect(characters).toHaveLength(1);
    expect(characters[0].title).toBe("title");
    expect(characters[0].text).toBe("text");
    expect(characters[0].fileNames[0].fileName).toBe("example.png");
    expect(characters[0].roles[0].role.title).toBe("role");
    expect(characters[0].roles[0].role.organization.title).toBe(
      "New Organization"
    );
    expect(characters[0].scenes[0].title).toBe("scene");
    expect(characters[0].scenes[0].timeline).toBe(1);
  });

  it("givenExistingCharacter_whenUpdated_thenCharacterUpdated", async () => {
    // Create a character to update
    const character = await prisma.character.create({
      data: {
        title: "Original Title",
        text: "Original Text",
        user: "test",
      },
    });

    // Update the character
    const updatedCharacter = await prisma.character.update({
      where: { id: character.id },
      data: {
        title: "Updated Title",
        text: "Updated Text",
      },
    });

    // Assertions to verify the update was successful
    expect(updatedCharacter.id).toBe(character.id);
    expect(updatedCharacter.title).toBe("Updated Title");
    expect(updatedCharacter.text).toBe("Updated Text");
  });
  it("givenExistingCharacter_whenDeleted_thenCharacterNotInDatabase", async () => {
    // Create a character to delete
    const character = await prisma.character.create({
      data: {
        title: "Delete Me",
        text: "Delete this character",
        user: "test",
      },
    });

    // Delete the character
    await prisma.character.delete({
      where: { id: character.id },
    });

    // Try to fetch the deleted character
    const deletedCharacter = await prisma.character.findUnique({
      where: { id: character.id },
    });

    // Assertions to ensure the character is deleted
    expect(deletedCharacter).toBeNull();
  });
});
