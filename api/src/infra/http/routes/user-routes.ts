import { FastifyInstance } from "fastify";
import { userController } from "../controllers/user";

export async function userRoutes(app: FastifyInstance) {

  app.post("/register", async (request, reply) => {
    await userController.create(request, reply);
  });

  app.post("/login", async (request, reply) => {
    await userController.login(request, reply);
  });

  app.get("/user/:userId", async (request, reply) => {
    await userController.getInfoUser(request, reply);
  });

  app.put("/user/:userId/update", async (request, reply) => {
    await userController.updateInfoUser(request, reply);
  });
}