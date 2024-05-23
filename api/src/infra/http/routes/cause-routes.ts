import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { causeController } from "../controllers/cause";

export async function causeRoutes(app: FastifyInstance) {
  app.post("/cause/create", async (request: FastifyRequest, reply: FastifyReply) => {
    await causeController.create(request, reply);
  });

  app.get("/causes/:userId", async (request: FastifyRequest, reply: FastifyReply) => {
    await causeController.causesByUser(request, reply);
  });

  app.get("/causes", async (request: FastifyRequest, reply: FastifyReply) => {
    await causeController.allCauses(reply);
  });

  app.get("/cause/:id", async (request: FastifyRequest, reply: FastifyReply) => {
    await causeController.causeById(request, reply);
  });

  app.put("/cause/:id", async (request: FastifyRequest, reply: FastifyReply) => {
    await causeController.save(request, reply);
  });

  app.delete("/cause/:causeId", async (request: FastifyRequest, reply: FastifyReply) => {
    await causeController.delete(request, reply);
  });
}