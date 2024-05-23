import { CauseRepositories } from "@app/repositories/causeRepositories";

interface GetCauseByIdProps {
  id: string;
}

export class GetCauseById {

  constructor(
    private repository: CauseRepositories
  ) {}

  async execute(request: GetCauseByIdProps) {
    const { id } = request;

    const cause = await this.repository.getCauseById(id);

    if(!cause) {
      throw new Error("Causa não encontrada")
    }

    return { cause }
  }
}