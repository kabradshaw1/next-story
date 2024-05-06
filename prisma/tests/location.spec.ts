import { Prisma } from "@prisma/client";
import prisma from "../prismaClient";

describe("location", () => {
  it("giveProperlyFormattedData_WwhenCreate_thenCreateLocation", () => {
    // given
    const input: Prisma.LocationCreateInput = {
      title: "title",
      text: "text",
      scene: { create: [{ title: "scene", timeline: 1 }] },
      fileNames: {
        create: [{ fileName: "example.png", discriminator: "location" }],
      },
      organizations: {
        create: [
          {
            title: "org 1",
          },
        ],
      },
    };

    // when
    const location = prisma.location.create({
      data: input,
      include: { scene: true, organizations: true, fileNames: true },
    });

    // then
    expect(location.title).toBe("title");
    expect(location.text).toBe("text");
    expect(location.scene[0].title).toBe("scene");
    expect(location.scene[0].timeline).toBe(1);
    expect(location.fileNames[0].fileName).toBe("example.png");
    expect(location.fileNames[0].discriminator).toBe("location");
  });
});
