import { CauseRepositories } from "../../repositories/causeRepositories";
import { CauseNotFoundError } from "../../exceptions/cause-not-found-error";

interface UnPublishCauseRequest {
  causeId: string;
}

export class UnPublishCause {
  constructor(
    private repository: CauseRepositories
  ) {}

  async execute(request: UnPublishCauseRequest) {
    const { causeId } = request;

    const cause = await this.repository.getCauseById(causeId);

    if(!cause) {
      throw new CauseNotFoundError()
    }

    cause.unPublish();

    await this.repository.save(cause);
  }
}