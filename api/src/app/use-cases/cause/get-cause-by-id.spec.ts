import { randomUUID } from "node:crypto";
import { CreateCause } from "./create-cause";
import { GetCauseById } from "./get-cause-by-id";
import { describe, expect, it } from "vitest";
import { InMemoryCauseRepositories } from "../../../../test/in-memory-cause-repositories";

describe("Get cause by id", () => {
  it("should be able to get a cause by id", async () => {
    const repositories = new InMemoryCauseRepositories();
    const createCause = new CreateCause(repositories);
    const getCauseById = new GetCauseById(repositories);

    const cause1 = await createCause.execute({
      title: "Doação de um pacote de fraldas",
      description: "Preciso de um pacote de fraldas para meu bebê de 5 meses. Por favor nos ajude!",
      contact: "83 98729-6826",
      email: "pedro@gmail.com",
      location: "Rua Doutor Paulo Roberto Mayer, 556",
      expirationAt:  new Date("20/08/2024"),
    });

    const { cause } = await getCauseById.execute({
      id: cause1.cause.id
    });

    expect(cause).toBeTruthy();
  })
})