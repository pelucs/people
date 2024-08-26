import { UserNotFoundError } from "../../exceptions/user-not-found-error";
import { UserRepositories } from "@app/repositories/userRepositories";

export class GetUser {

  constructor(
    private repository: UserRepositories
  ) {}

  async execute(userId: string) {
    const user = await this.repository.findUserById(userId);

    if(!user){
      throw new UserNotFoundError()
    }

    return { user }
  }
}