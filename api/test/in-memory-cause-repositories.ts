import { Cause } from "@app/entities/cause/cause";
import { CauseRepositories } from "@app/repositories/causeRepositories";
import { UpdateCauseProps } from "@app/use-cases/cause/update-cause";

export class InMemoryCauseRepositories implements CauseRepositories {
      
  public causes: Cause[] = [];
  
  async getCauseById(id: string): Promise<Cause> {
    const cause = this.causes.find(
      (cause) => cause.id === id
    );

    if(!cause) {
      throw new Error("Causa não encontrada")
    }

    return cause;
  }

  async getAllCauses(): Promise<Cause[]> {
    return this.causes;
  }

  async create(cause: Cause): Promise<void> {
    this.causes.push(cause);
  }

  async save(cause: Cause): Promise<void> {
    // Irá pegar uma notificação com base no index
    const causeIndex = this.causes.findIndex(
      (item) => item.id === cause.id
    );

    // Irá sobrepor a notificação com uma nova atualização
    if(causeIndex >= 0){
      this.causes[causeIndex] = cause
    }
  }

  async delete(causeId: string): Promise<void> {
    const causeIndex = this.causes.findIndex(
      (item) => item.id === causeId
    );

    if (causeIndex > -1) {
      this.causes.splice(causeIndex, 1);
    }
  }
}