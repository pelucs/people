import "dotenv/config";

import fastify from "fastify";
import cors from "@fastify/cors";

import { userRoutes } from "./infra/http/routes/user-routes";
import { causeRoutes } from "./infra/http/routes/cause-routes";

const app = fastify();

app.register(cors, {
  origin: '*'
})

app.register(userRoutes);
app.register(causeRoutes);

app.listen({
  host: "0.0.0.0",
  port: process.env.PORT ? Number(process.env.PORT) : 3333
})
.then(() => {
  console.log(`HTTP Server Running on port ${process.env.PORT || 3333}`)
});