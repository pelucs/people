import { User } from "@app/entities/user/user";
import { prisma } from "../prisma-client";
import { UserRepositories } from "@app/repositories/userRepositories";
import { PrismaUserMappers } from "../mappers/prisma-user-mappers";
import { UpdateUserRequest } from "@app/use-cases/user/update-user";

export class PrismaUserRepositories implements UserRepositories {

  // Buscar um usuário pelo email
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      }
    });

    if(!user){
      return null
    }

    return PrismaUserMappers.toDomain(user);
  }

  // Buscando um usuário pelo id
  async findUserById(userId: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    }) ;

    if(!user) {
      return null
    }

    return PrismaUserMappers.toDomain(user);
  }

  // Atualizando as informações do usuário
  async update(userId: string, data: UpdateUserRequest): Promise<void> {

    const { name, type, address, contact } = data;

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name, 
        type, 
        address, 
        contact,
      }
    });
  }

  // Criando um usuário
  async create(user: User): Promise<void> {
    const raw = PrismaUserMappers.toPrisma(user);

    await prisma.user.create({
      data: raw
    });
  }
}