import { CauseRepositories } from "@app/repositories/causeRepositories";
import { CauseNotFoundError } from "../../exceptions/cause-not-found-error";

interface DeleteCauseRequest {
  causeId: string;
}

export class DeleteCause {
  constructor(
    private repository: CauseRepositories
  ) {}

  async execute(request: DeleteCauseRequest) {
    const { causeId } = request;

    const cause = await this.repository.getCauseById(causeId);

    if(!cause) {
      throw new CauseNotFoundError()
    }

    await this.repository.delete(causeId);
  }
}