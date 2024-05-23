import { UserNotFoundError } from "../../exceptions/user-not-found-error";
import { UserRepositories } from "@app/repositories/userRepositories";

interface GetUserRequest {
  userId: string;
}

export class GetUser {

  constructor(
    private repository: UserRepositories
  ) {}

  async execute(request: GetUserRequest) {
    const { userId } = request;

    const user = await this.repository.findUserById(userId);

    if(!user){
      throw new UserNotFoundError()
    }

    return { user }
  }
}