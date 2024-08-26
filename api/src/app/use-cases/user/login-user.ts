import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { UserRepositories } from "../../repositories/userRepositories";
import { UserNotFoundError } from "../../exceptions/user-not-found-error";
import { UserIncorrectPasswordError } from "../../exceptions/user-incorrect-password-error";

interface LoginUserRequest {
  email: string;
  password: string;
}

export class LoginUser {

  constructor(
    private repository: UserRepositories
  ) {}

  async execute(request: LoginUserRequest) {

    const { email, password } = request;

    const user = await this.repository.findByEmail(email);
    
    if(!user){
      throw new UserNotFoundError();
    }

    const compareHash = await bcrypt.compare(password, user.password);
    
    if(!compareHash){
      throw new UserIncorrectPasswordError()
    }
    
    const token = jwt.sign({
      id: user.id,
      name: user.name,
    }, `${process.env.SECRET_JWT}`, { expiresIn: '1d' });
    
    return { token } 
  }
}