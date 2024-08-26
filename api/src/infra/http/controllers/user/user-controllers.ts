import { z } from "zod";
import { GetUser } from "@app/use-cases/user/get-user";
import { LoginUser } from "@app/use-cases/user/login-user";
import { UpdateUser } from "@app/use-cases/user/update-user";
import { CreateUser } from "@app/use-cases/user/create-user";
import { UserNotFoundError } from "@app/exceptions/user-not-found-error";
import { UserAlreadyExistsError } from "@app/exceptions/user-already-exists-with-email-error";
import { UserIncorrectPasswordError } from "@app/exceptions/user-incorrect-password-error";
import { FastifyReply, FastifyRequest } from "fastify";

export class UserControllers {
  constructor(
    private createUser: CreateUser,
    private loginUser: LoginUser,
    private getUser: GetUser,
    private updateUser: UpdateUser
  ) {}

  // Criação de um usuário
  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const bodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
        type: z.string(),
        permissions: z.string().array(),
      })
  
      const data = bodySchema.parse(request.body);
  
      await this.createUser.execute(data);

      return reply.status(201).send("Usuário criado com sucesso")
    } catch (err){
      if(err instanceof UserAlreadyExistsError){
        return reply.status(409).send({ message: err.message });
      }
      return reply.status(400).send({
        message: err || "Erro inesperado"
      })
    }
  }

  // Efetuando login
  async login(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string(),
    })

    const data = bodySchema.parse(request.body);

    try {
      const { token } = await this.loginUser.execute(data)
      return reply.status(200).send(token);
    } catch (err){
      if(err instanceof UserIncorrectPasswordError){
        console.log("1" + err)
        return reply.status(404).send({ message: err.message });

      } else if(err instanceof UserNotFoundError) {
        return reply.status(404).send({ message: err.message });
      }

      
    }
  }

  // Pegando informações do usuário
  async getInfoUser(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
      userId: z.string(),
    })

    const { userId } = paramsSchema.parse(request.params);

    try {
      const { user } = await this.getUser.execute(userId);

      return reply.status(200).send({
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
        permissions: user.permissions,
      });
    } catch(err) {
      if(err instanceof UserNotFoundError) {
        return reply.status(404).send({ message: err.message });
      }

      return reply.status(404).send({
        message: err || "Erro inesprado"
      })
    }
  }

  // Atualizando informações do usuário
  async updateInfoUser(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
      userId: z.string(),
    });

    const bodySchema = z.object({
      name: z.string(),
      address: z.string(),
      contact: z.string(),
      type: z.string(),
      permissions: z.string().array(),
    })

    const data = bodySchema.parse(request.body);
    const { userId } = paramsSchema.parse(request.params);

    try {
      const { token } = await this.updateUser.execute(userId, data);

      return reply.status(200).send(token);
    } catch(err) {
      if(err instanceof UserNotFoundError) {
        return reply.status(404).send({ message: err.message });
      }

      return reply.status(404).send({
        message: err || "Erro inesprado"
      })
    }
  }
}