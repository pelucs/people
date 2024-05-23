"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/infra/http/controllers/cause/cause-controllers.ts
var cause_controllers_exports = {};
__export(cause_controllers_exports, {
  CauseController: () => CauseController
});
module.exports = __toCommonJS(cause_controllers_exports);
var import_zod = require("zod");

// src/app/exceptions/cause-not-found-error.ts
var CauseNotFoundError = class extends Error {
  constructor() {
    super("Causa n\xE3o encontrada");
  }
};

// src/infra/http/view-models/cause-view-model.ts
var CauseViewModelMapper = class {
  static toHttp(cause) {
    return {
      id: cause.id,
      userId: cause.userId,
      title: cause.title,
      email: cause.email,
      contact: cause.contact,
      description: cause.description,
      location: cause.location,
      createAt: cause.createAt
    };
  }
};

// src/infra/http/controllers/cause/cause-controllers.ts
var CauseController = class {
  constructor(createCause, getCauses, getAllCauses, getCauseById, updateCause, deleteCause) {
    this.createCause = createCause;
    this.getCauses = getCauses;
    this.getAllCauses = getAllCauses;
    this.getCauseById = getCauseById;
    this.updateCause = updateCause;
    this.deleteCause = deleteCause;
  }
  // Criação de uma causa
  async create(request, reply) {
    try {
      const bodySchema = import_zod.z.object({
        userId: import_zod.z.string(),
        title: import_zod.z.string(),
        email: import_zod.z.string(),
        contact: import_zod.z.string(),
        location: import_zod.z.string(),
        description: import_zod.z.string()
      });
      const data = bodySchema.parse(request.body);
      const { cause } = await this.createCause.execute({
        userId: data.userId,
        title: data.title,
        email: data.email,
        contact: data.contact,
        location: data.location,
        description: data.description
      });
      return reply.status(201).send({
        message: "Causa criada com sucesso",
        id: cause.id
      });
    } catch (err) {
      return reply.status(400).send("Erro inesperado");
    }
  }
  // Resgatando todas as causas do usuário
  async causesByUser(request, reply) {
    try {
      const paramsSchema = import_zod.z.object({
        userId: import_zod.z.string()
      });
      const data = paramsSchema.parse(request.params);
      const { causes } = await this.getCauses.execute(data);
      return reply.status(200).send(
        causes.map((cause) => CauseViewModelMapper.toHttp(cause))
      );
    } catch (err) {
      return reply.status(400).send("Erro inesperado");
    }
  }
  // Resgatando todas as causas
  async allCauses(reply) {
    try {
      const { causes } = await this.getAllCauses.execute();
      reply.status(200).send(
        causes.map((cause) => CauseViewModelMapper.toHttp(cause))
      );
    } catch (err) {
      reply.status(400).send(err);
    }
  }
  // Regatando causa única
  async causeById(request, reply) {
    try {
      const paramsSchema = import_zod.z.object({
        id: import_zod.z.string()
      });
      const { id } = paramsSchema.parse(request.params);
      const { cause } = await this.getCauseById.execute({ id });
      reply.status(200).send(CauseViewModelMapper.toHttp(cause));
    } catch (err) {
      reply.status(404).send("Causa n\xE3o encontrada");
    }
  }
  // Salvando alterações de uma causa
  async save(request, reply) {
    try {
      const bodySchema = import_zod.z.object({
        title: import_zod.z.string().nullish(),
        description: import_zod.z.string().nullish(),
        email: import_zod.z.string().nullish(),
        contact: import_zod.z.string().nullish(),
        location: import_zod.z.string().nullish()
      });
      const paramsSchema = import_zod.z.object({
        id: import_zod.z.string()
      });
      const { id } = paramsSchema.parse(request.params);
      const data = bodySchema.parse(request.body);
      await this.updateCause.execute(id, {
        title: data.title,
        description: data.description,
        location: data.location,
        contact: data.contact,
        email: data.email
      });
      reply.status(200).send("Causa atualizada com sucesso");
    } catch (err) {
      if (err instanceof CauseNotFoundError) {
        return reply.status(404).send({ message: err.message });
      }
      return reply.status(404).send({
        message: err || "Erro inesprado"
      });
    }
  }
  // Deletando uma causa
  async delete(request, reply) {
    try {
      const paramsSchema = import_zod.z.object({
        causeId: import_zod.z.string()
      });
      const { causeId } = paramsSchema.parse(request.params);
      await this.deleteCause.execute({ causeId });
      reply.status(200).send("Causa deletada com sucesso");
    } catch (err) {
      if (err instanceof CauseNotFoundError) {
        return reply.status(404).send({ message: err.message });
      }
      return reply.status(404).send({
        message: err || "Erro inesprado"
      });
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CauseController
});
