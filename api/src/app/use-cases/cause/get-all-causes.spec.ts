import { InMemoryCauseRepositories } from "../../../../test/in-memory-cause-repositories";
import { describe, it, expect } from "vitest";
import { CreateCause } from "./create-cause";
import { randomUUID } from "node:crypto";
import { GetAllCauses } from "./get-all-causes";

describe("Get all causes", () => {
  it("should be able to get all causes", async () => {
    const repositories = new InMemoryCauseRepositories();
    const createCause = new CreateCause(repositories);
    const getAllCauses = new GetAllCauses(repositories);

    await createCause.execute({
      title: "Doação de um pacote de fraldas",
      description: "Preciso de um pacote de fraldas para meu bebê de 5 meses. Por favor nos ajude!",
      contact: "83 98729-6826",
      email: "pedro@gmail.com",
      location: "Rua Doutor Paulo Roberto Mayer, 556",
      expirationAt: new Date("20/08/2024"),
      imagesUrl: ["teste.png"]
    });

    await createCause.execute({
      title: "Doação de um pacote de fraudas",
      description: "Preciso de um pacote de fraudas para meu bebê de 5 meses. Por favor nos ajude!",
      contact: "83 98729-6826",
      email: "pedro@gmail.com",
      location: "Rua Doutor Paulo Roberto Mayer, 556",
      expirationAt: new Date("20/08/2024"),
      imagesUrl: ["teste.png"]
    });

    const { causes } = await getAllCauses.execute();

    expect(causes).toBeTruthy();
    expect(causes).toHaveLength(2);
  })
})