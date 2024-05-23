import { User } from "@app/entities/user/user";
import { UpdateUserRequest } from "@app/use-cases/user/update-user";

export interface UserRepositories {
  findByEmail(email: string): Promise<User | null>;
  findUserById(userId: string): Promise<User | null>;
  update(userId: string, request: UpdateUserRequest): Promise<void>;
  create(user: User): Promise<void>;
}