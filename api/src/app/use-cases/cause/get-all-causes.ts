import { CauseRepositories } from "@app/repositories/causeRepositories";

export class GetAllCauses {
  constructor (
    private repository: CauseRepositories
  ) {}

  async execute(query?: string | null | undefined) {
    const causes = await this.repository.getAllCauses(query);
    return { causes }
  }
}