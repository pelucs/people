import { CreateUser } from './create-user';
import { describe, it, expect } from 'vitest';
import { InMemoryUserRepositories } from '../../../../test/in-memory-user-repositories';

describe("Create a user", () => {
  it("should be able to create a user", async () => {
    const repositories = new InMemoryUserRepositories();
    const createUser = new CreateUser(repositories);

    const { user } = await createUser.execute({
      name: "Pedro",
      email: "pedro@gmail.com",
      password: "123456",
      type: "admin"
    });

    expect(user).toBeTruthy();
  })
})