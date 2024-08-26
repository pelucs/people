import { InMemoryCauseRepositories } from "../../../../test/in-memory-cause-repositories";
import { describe, expect, it } from "vitest";
import { CreateCause } from "./create-cause";
import { UpdateCause } from "./update-cause";

describe("Update cause", () => {
  it("should be able to update a cause", async () => {
    const repositories = new InMemoryCauseRepositories();
    const createCause = new CreateCause(repositories);
    const updateCause = new UpdateCause(repositories);

    const { cause } = await createCause.execute({
      title: "Doação de um pacote de fraldas",
      description: "Preciso de um pacote de fraldas para meu bebê de 5 meses. Por favor nos ajude!",
      contact: "83 98729-6826",
      email: "pedro@gmail.com",
      location: "Rua Doutor Paulo Roberto Mayer, 556",
      imagesUrl: ["teste.png"]
    });

    await updateCause.execute(cause.id, {
      title: "Doação de uma teclado e mouse"
    });

    expect(repositories.causes[0].title).toEqual("Doação de uma teclado e mouse");
  })
})