import { User } from "./user";
import { describe, it, expect } from 'vitest';

describe("Create user", () => {
  it("should be able to create a user", () => {
    const user = new User({
      name: "Pedro Lucas",
      email: "lucas@gmail.com",
      password: "123456",
      type: "normal",
    });

    expect(user).toBeTruthy();
  })
})