import { Cause } from "../../entities/cause/cause";
import { CauseRepositories } from "@app/repositories/causeRepositories";

interface CreateUserRequest {
  title: string;
  email: string;
  contact: string;
  location: string;
  description: string;
  imagesUrl: string[];
}

export class CreateCause {
  constructor (
    private repository: CauseRepositories
  ) {}

  async execute(request: CreateUserRequest) {
    const data = request;

    const cause = new Cause({
      title: data.title,
      email: data.email,
      contact: data.contact,
      location: data.location,
      description: data.description,
      imagesUrl: data.imagesUrl,
      isPublic: false,
    });

    await this.repository.create(cause);

    return { cause }
  }
}