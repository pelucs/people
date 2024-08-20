import { CauseRepositories } from "@app/repositories/causeRepositories";

interface GetCauseByIdProps {
  causeId: string;
}

export class GetCauseById {

  constructor(
    private repository: CauseRepositories
  ) {}

  async execute(request: GetCauseByIdProps) {
    const { causeId } = request;

    const cause = await this.repository.getCauseById(causeId);

    if(!cause) {
      throw new Error("Causa não encontrada")
    }

    return { cause }
  }
}