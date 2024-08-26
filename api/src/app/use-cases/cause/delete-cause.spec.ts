import { InMemoryCauseRepositories } from "../../../../test/in-memory-cause-repositories";
import { describe, it, expect } from "vitest";
import { CreateCause } from "./create-cause";
import { DeleteCause } from "./delete-cause";

describe("Delete a cause", () => {
  it("should be able to delete a cause by id", async () => {
    const repositories = new InMemoryCauseRepositories();
    const createCause = new CreateCause(repositories);

    const { cause } = await createCause.execute({
      title: "Doação de um pacote de fraldas",
      description: "Preciso de um pacote de fraldas para meu bebê de 5 meses. Por favor nos ajude!",
      contact: "83 98729-6826",
      email: "pedro@gmail.com",
      location: "Rua Doutor Paulo Roberto Mayer, 556",
      imagesUrl: ["teste.png"]
    });

    await repositories.delete(cause.id);

    expect(repositories.causes).toHaveLength(0);
  })
})