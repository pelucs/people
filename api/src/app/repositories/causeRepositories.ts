import { Cause } from "@app/entities/cause/cause";
export interface CauseRepositories {
  getAllCauses(query?: string | null | undefined): Promise<Cause[]>;
  getCauseById(causeId: string): Promise<Cause>;
  create(cause: Cause): Promise<void>;
  save(cause: Cause): Promise<void>;
  delete(causeId: string): Promise<void>;
}