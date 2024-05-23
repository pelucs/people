import { randomUUID } from "crypto";
import { CreateCause } from "./create-cause";
import { describe, expect, it } from "vitest";
import { InMemoryCauseRepositories } from "../../../../test/in-memory-cause-repositories";

describe("Create cause", () => {
  it("should be able to create a cause", async () => {
    const repository = new InMemoryCauseRepositories();
    const createCause = new CreateCause(repository);

    const { cause } = await createCause.execute({
      userId: randomUUID(),
      title: "Doação de um pacote de fraldas",
      description: "Preciso de um pacote de fraldas para meu bebê de 5 meses. Por favor nos ajude!",
      contact: "83 98729-6826",
      email: "pedro@gmail.com",
      location: "Rua Doutor Paulo Roberto Mayer, 556"
    });

    expect(cause).toBeTruthy();
  })
})