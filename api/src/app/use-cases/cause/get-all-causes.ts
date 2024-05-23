import { CauseRepositories } from "@app/repositories/causeRepositories";

export class GetAllCauses {
  constructor (
    private repository: CauseRepositories
  ) {}

  async execute() {
    const causes = await this.repository.getAllCauses();
    return { causes }
  }
}