import { Cause } from "./cause";
import { describe, it, expect } from "vitest";

describe("Create cause", () => {
  it("should be able to create a cause", () => {
    const cause = new Cause({
      title: "Doação de fraudas",
      description: "Meu bebê está precisando de fraudas.",
      contact: "83 98729-6826",
      email: "pedro@gmail.com",
      location: "Rua Doutos Paulo Roberto Mayer",
      isPublic: false,
      expirationAt: new Date("20/08/2024"),
      imagesUrl: ["teste.png"]
    });

    expect(cause).toBeTruthy();
  });
});