import jwt from "jsonwebtoken";

import { UserNotFoundError } from "../../exceptions/user-not-found-error";
import { UserRepositories } from "@app/repositories/userRepositories";

export interface UpdateUserRequest {
  name: string;
  type: string;
  permissions: string[];
}

export class UpdateUser {

  constructor(
    private repository: UserRepositories
  ) {}

  async execute(userId: string, request: UpdateUserRequest) {
    const { name, type, permissions } = request;

    const isAlreadyExists = await this.repository.findUserById(userId);

    if(!isAlreadyExists) {
      throw new UserNotFoundError()
    }

    await this.repository.update(userId, {
      name,
      type,
      permissions,
    });

    const token = jwt.sign({
      id: userId,
      name,
    }, `${process.env.SECRET_JWT}`, { expiresIn: '1d' });
    
    return { token } 
  }
}