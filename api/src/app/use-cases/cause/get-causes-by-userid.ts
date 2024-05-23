import { CauseRepositories } from "@app/repositories/causeRepositories";

interface GetUserProps {
  userId: string
}

export class GetCausesByUserId {
  constructor(
    private repository: CauseRepositories
  ) {}

  async execute(request: GetUserProps) {
    const { userId } = request;

    const causes = await this.repository.findCausesByUserId(userId);

    if(!causes){
      throw new Error()
    }

    return { causes } 
  }
}