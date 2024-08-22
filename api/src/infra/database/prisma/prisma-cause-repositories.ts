import { Cause } from "@app/entities/cause/cause";
import { prisma } from "../prisma-client";
import { CauseRepositories } from "@app/repositories/causeRepositories";
import { PrismaCauseMappers } from "../mappers/prisma-cause-mappers";

export class PrismaCauseRepositories implements CauseRepositories {
 
  // Resgatando uma causa específica
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
  
  //Regatando as causas
  async getAllCauses(query?: string | null | undefined): Promise<Cause[]> {

    const causes = await prisma.cause.findMany({
      where: query ? {
        OR: [
          {
            title: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      } : {},
      orderBy: {
        createAt: "desc"
      }
    });

    return causes.map(cause => PrismaCauseMappers.toDomain(cause));
  }

  // Criando uma causa
  async create(cause: Cause): Promise<void> {
    const raw = PrismaCauseMappers.toPrisma(cause);

    await prisma.cause.create({
      data: raw
    })
  }

  // Atualizando informações de uma causa
  async save(cause: Cause): Promise<void> {
    const raw = PrismaCauseMappers.toPrisma(cause);
    const { id, ...data } = raw;

    await prisma.cause.update({
      where: {
        id,
      },
      data,
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