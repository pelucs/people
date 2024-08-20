import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { causeController } from "../controllers/cause";

export async function causeRoutes(app: FastifyInstance) {

  // Criar causa
  app.post("/cause/create", async (request: FastifyRequest, reply: FastifyReply) => {
    await causeController.create(request, reply);
  });

  // Resgatar todas as causas
  app.get("/causes", async (request: FastifyRequest, reply: FastifyReply) => {
    await causeController.allCauses(reply);
  });

  // Resgatar todas as causas públicas
  app.get("/causes/public", async (request: FastifyRequest, reply: FastifyReply) => {
    await causeController.allPublicCauses(reply);
  });

  // Resgatar uma causa específica
  app.get("/cause/:causeId", async (request: FastifyRequest, reply: FastifyReply) => {
    await causeController.causeById(request, reply);
  });

  // Atualizar uma causa
  app.put("/cause/:causeId", async (request: FastifyRequest, reply: FastifyReply) => {
    await causeController.save(request, reply);
  });

  // Publicar uma causa
  app.put("/cause/:causeId/publish", async (request: FastifyRequest, reply: FastifyReply) => {
    await causeController.publish(request, reply);
  });

  // Privar uam causa
  app.put("/cause/:causeId/unpublish", async (request: FastifyRequest, reply: FastifyReply) => {
    await causeController.unPublish(request, reply);
  });

  // Deletar uam causa
  app.delete("/cause/:causeId", async (request: FastifyRequest, reply: FastifyReply) => {
    await causeController.delete(request, reply);
  });
}