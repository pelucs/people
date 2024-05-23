import { z } from "zod";
import { CreateCause } from "@app/use-cases/cause/create-cause";
import { UpdateCause } from "@app/use-cases/cause/update-cause";
import { DeleteCause } from "@app/use-cases/cause/delete-cause";
import { GetAllCauses } from "@app/use-cases/cause/get-all-causes";
import { GetCauseById } from "@app/use-cases/cause/get-cause-by-id";
import { GetCausesByUserId } from "@app/use-cases/cause/get-causes-by-userid";
import { CauseNotFoundError } from "@app/exceptions/cause-not-found-error";
import { CauseViewModelMapper } from "@infra/http/view-models/cause-view-model";
import { FastifyReply, FastifyRequest } from "fastify";

export class CauseController {

  constructor(
    private createCause: CreateCause,
    private getCauses: GetCausesByUserId,
    private getAllCauses: GetAllCauses,
    private getCauseById: GetCauseById,
    private updateCause: UpdateCause,
    private deleteCause: DeleteCause,
  ) {}

  // Criação de uma causa
  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const bodySchema = z.object({
        userId: z.string(),
        title: z.string(),
        email: z.string(),
        contact: z.string(),
        location: z.string(),
        description: z.string(),
      })
      
      const data = bodySchema.parse(request.body);

      const { cause } = await this.createCause.execute({
        userId: data.userId,
        title: data.title,
        email: data.email,
        contact: data.contact,
        location: data.location,
        description: data.description,
      });

      return reply.status(201).send({
        message: "Causa criada com sucesso",
        id: cause.id,
      })
    } catch(err) {
      return reply.status(400).send("Erro inesperado")
    } 
  }

  // Resgatando todas as causas do usuário
  async causesByUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const paramsSchema = z.object({
        userId: z.string(),
      });

      const data = paramsSchema.parse(request.params);

      const { causes } = await this.getCauses.execute(data);

      return reply.status(200).send(
        causes.map(cause => CauseViewModelMapper.toHttp(cause))
      );
    } catch (err){
      return reply.status(400).send("Erro inesperado")
    }
  }

  // Resgatando todas as causas
  async allCauses(reply: FastifyReply) {
    try {
      const { causes } = await this.getAllCauses.execute();

      reply.status(200).send(
        causes.map(cause => CauseViewModelMapper.toHttp(cause))
      );
    } catch(err) {
      reply.status(400).send(err)
    }
  }

  // Regatando causa única
  async causeById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const paramsSchema = z.object({
        id: z.string(),
      });

      const { id } = paramsSchema.parse(request.params);

      const { cause } = await this.getCauseById.execute({ id });

      reply.status(200).send(CauseViewModelMapper.toHttp(cause));
    } catch(err) {
      reply.status(404).send("Causa não encontrada")
    }
  }

  // Salvando alterações de uma causa
  async save(request: FastifyRequest, reply: FastifyReply) {
    try {
      const bodySchema = z.object({
        title: z.string().nullish(),
        description: z.string().nullish(),
        email: z.string().nullish(),
        contact: z.string().nullish(),
        location: z.string().nullish(),
      });

      const paramsSchema = z.object({
        id: z.string()
      });

      const { id } = paramsSchema.parse(request.params);
      const data = bodySchema.parse(request.body);

      await this.updateCause.execute(id, {
        title: data.title,
        description: data.description,
        location: data.location,
        contact: data.contact,
        email: data.email,
      });

      reply.status(200).send("Causa atualizada com sucesso")
    } catch(err) {
      if(err instanceof CauseNotFoundError) {
        return reply.status(404).send({ message: err.message });
      }

      return reply.status(404).send({
        message: err || "Erro inesprado"
      });
    }
  }

  // Deletando uma causa
  async delete(request: FastifyRequest, reply: FastifyReply) {
    try {
      const paramsSchema = z.object({
        causeId: z.string()
      });

      const { causeId } = paramsSchema.parse(request.params);

      await this.deleteCause.execute({ causeId });

      reply.status(200).send("Causa deletada com sucesso");
    } catch(err) {
      if(err instanceof CauseNotFoundError) {
        return reply.status(404).send({ message: err.message });
      }

      return reply.status(404).send({
        message: err || "Erro inesprado"
      }); 
    }
  }
}