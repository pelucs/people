import { GetUser } from "./get-user";
import { CreateUser } from "./create-user";
import { describe, it, expect } from "vitest";
import { InMemoryUserRepositories } from "../../../../test/in-memory-user-repositories";

describe("Get user by id", () => {
  it("should be able to get user by id", async () => {
    const repositories = new InMemoryUserRepositories();
    const createUser = new CreateUser(repositories);
    const getUser = new GetUser(repositories);

    const { user } = await createUser.execute({
      name: "Pedro",
      email: "pedro@gmail.com",
      password: "123456",
      type: "normal"
    });

    const isAlreadyUserById = await getUser.execute({ userId: user.id });

    expect(isAlreadyUserById).toBeTruthy()
  })
})