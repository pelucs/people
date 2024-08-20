import { CauseRepositories } from "../../repositories/causeRepositories";
import { CauseNotFoundError } from "../../exceptions/cause-not-found-error";

interface PublishCauseRequest {
  causeId: string;
}

export class PublishCause {
  constructor(
    private repository: CauseRepositories
  ) {}

  async execute(request: PublishCauseRequest) {
    const { causeId } = request;

    const cause = await this.repository.getCauseById(causeId);

    if(!cause) {
      throw new CauseNotFoundError()
    }

    cause.publish();

    await this.repository.save(cause);
  }
}