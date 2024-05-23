import { CauseNotFoundError } from "../../exceptions/cause-not-found-error";
import { CauseRepositories } from "@app/repositories/causeRepositories";

export interface UpdateCauseProps {
  title?: string | null | undefined;
  description?: string | null | undefined;
  location?: string | null | undefined;
  contact?: string | null | undefined;
  email?: string | null | undefined;
}

export class UpdateCause {

  constructor(
    private repository: CauseRepositories
  ) {}

  async execute(id: string, request: UpdateCauseProps) {
    const { title, description, location, email, contact } = request;

    const cause = await this.repository.getCauseById(id);

    if(!cause) {
      throw new CauseNotFoundError()
    }

    cause.update({
      title, 
      description, 
      location, 
      email, 
      contact,
    });

    await this.repository.save(cause);
  }
}