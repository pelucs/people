import { CauseNotFoundError } from "../../exceptions/cause-not-found-error";
import { CauseRepositories } from "@app/repositories/causeRepositories";

export interface UpdateCauseProps {
  title?: string | null | undefined;
  description?: string | null | undefined;
  location?: string | null | undefined;
  contact?: string | null | undefined;
  email?: string | null | undefined;
  imagesUrl?: string[] | null | undefined;
}

export class UpdateCause {

  constructor(
    private repository: CauseRepositories
  ) {}

  async execute(causeId: string, request: UpdateCauseProps) {
    const { title, description, location, email, contact, imagesUrl } = request;

    const cause = await this.repository.getCauseById(causeId);

    if(!cause) {
      throw new CauseNotFoundError()
    }

    cause.update({
      title, 
      description, 
      location, 
      email, 
      contact,
      imagesUrl,
    });

    await this.repository.save(cause);
  }
}