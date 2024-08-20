import { InMemoryCauseRepositories } from "../../../../test/in-memory-cause-repositories";
import { describe, expect, it } from "vitest";
import { CreateCause } from "./create-cause";
import { PublishCause } from "./publish-cause";

describe("Publish cause", () => {
  it("should be able to publish a cause", async () => {
    const repositories = new InMemoryCauseRepositories();
    const createCause = new CreateCause(repositories);
    const publishCause = new PublishCause(repositories);

    const { cause } = await createCause.execute({
      title: "Doação de um pacote de fraldas",
      description: "Preciso de um pacote de fraldas para meu bebê de 5 meses. Por favor nos ajude!",
      contact: "83 98729-6826",
      email: "pedro@gmail.com",
      location: "Rua Doutor Paulo Roberto Mayer, 556",
      expirationAt:  new Date("20/08/2024"),
      imagesUrl: ["teste.png"]
    });

    await publishCause.execute({ causeId: cause.id });

    expect(repositories.causes[0].isPublic).toEqual(true);
  })
})