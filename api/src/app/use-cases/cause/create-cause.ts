import { Cause } from "../../entities/cause/cause";
import { CauseRepositories } from "@app/repositories/causeRepositories";

interface CreateUserRequest {
  userId: string;
  title: string;
  email: string;
  contact: string;
  location: string;
  description: string;
}

export class CreateCause {
  constructor (
    private repository: CauseRepositories
  ) {}

  async execute(request: CreateUserRequest) {
    const data = request;

    const cause = new Cause({
      userId: data.userId,
      title: data.title,
      email: data.email,
      contact: data.contact,
      location: data.location,
      description: data.description,
    });

    await this.repository.create(cause);

    return { cause }
  }
}