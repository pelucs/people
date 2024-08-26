import { InMemoryUserRepositories } from "../../../../test/in-memory-user-repositories";
import { describe, expect, it } from "vitest";
import { LoginUser } from "./login-user";
import { CreateUser } from "./create-user";

describe("Login user", () => {
  it("should be able login", async () => {
    const repositories = new InMemoryUserRepositories();
    const createUser = new CreateUser(repositories);
    const login = new LoginUser(repositories);

    const { user } = await createUser.execute({
      name: "Pedro",
      email: "pedro@gmail.com",
      password: "123456",
      type: "normal",
      permissions: ["create"]
    });

    const { token } = await login.execute({
      email: user.email,
      password: "123456"
    });
    
    expect(token).toBeTruthy();
  })
})