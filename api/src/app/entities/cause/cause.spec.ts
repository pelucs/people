import { Cause } from "./cause";
import { randomUUID } from "crypto";
import { describe, it, expect } from "vitest";

describe("Create cause", () => {
  it("should be able to create a cause", () => {
    const cause = new Cause({
      title: "Doação de fraudas",
      description: "Meu bebê está precisando de fraudas.",
      contact: "83 98729-6826",
      email: "pedro@gmail.com",
      location: "Rua Doutos Paulo Roberto Mayer",
      userId: randomUUID(),
    });

    expect(cause).toBeTruthy();
  });
});