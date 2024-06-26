import { Cause } from "@app/entities/cause/cause";
import { prisma } from "../prisma-client";
import { CauseRepositories } from "@app/repositories/causeRepositories";
import { PrismaCauseMappers } from "../mappers/prisma-cause-mappers";

export class PrismaCauseRepositories implements CauseRepositories {
 
  async getCauseById(id: string): Promise<Cause> {
    const cause = await prisma.cause.findUnique({
      where: {
        id,
      }
    });

    if(!cause){
      throw new Error("Causa não encontradas");
    }

    return PrismaCauseMappers.toDomain(cause);
  }
  
  async getAllCauses(): Promise<Cause[]> {
    const causes = await prisma.cause.findMany({
      orderBy: {
        createAt: "desc"
      }
    });

    return causes.map(cause => PrismaCauseMappers.toDomain(cause));
  }

  // Pegando uma causa específica
  async findCausesByUserId(userId: string): Promise<Cause[]> {
    const causes = await prisma.cause.findMany({
      where: {
        userId,
      },
      orderBy: {
        createAt: "desc"
      }
    });

    if(!causes){
      throw new Error("Causas não encontradas");
    }

    return causes.map(cause => PrismaCauseMappers.toDomain(cause));
  }

  // Criação de uma causa
  async create(cause: Cause): Promise<void> {
    const raw = PrismaCauseMappers.toPrisma(cause);

    await prisma.cause.create({
      data: raw
    })
  }

  // Atualizando informações de uma causa
  async save(cause: Cause): Promise<void> {
    const { 
      id,
      title, 
      description, 
      location, 
      email, 
      contact,
    } = PrismaCauseMappers.toPrisma(cause);

    await prisma.cause.update({
      where: {
        id,
      },
      data: {
        title, 
        description, 
        location, 
        email, 
        contact,
      },
    });
  }

  // Deletando uma causa
  async delete(causeId: string): Promise<void> {
    await prisma.cause.delete({
      where: {
        id: causeId,
      }
    });
  }
}