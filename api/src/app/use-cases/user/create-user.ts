import bcrypt from "bcrypt";

import { User } from "../../entities/user/user";
import { UserRepositories } from "../../repositories/userRepositories";
import { UserAlreadyExistsError } from '../../exceptions/user-already-exists-with-email-error';

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  type: string;
  permissions: string[];
}

interface CreateUserReply {
  user: User
}

export class CreateUser {
  
  constructor(
    private repository: UserRepositories
  ) {}
  
  async execute(request: CreateUserRequest): Promise<CreateUserReply> {
    const { name, email, password, type, permissions } = request;

    const isAlreadyUser = await this.repository.findByEmail(email);

    if(isAlreadyUser){
      throw new UserAlreadyExistsError()
    }

    const user = new User({
      name,
      email,
      type,
      permissions,
      password: await bcrypt.hash(password, 10),
    })

    await this.repository.create(user);

    return { user }
  }
}