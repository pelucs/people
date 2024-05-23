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

// src/infra/http/routes/cause-routes.ts
var cause_routes_exports = {};
__export(cause_routes_exports, {
  causeRoutes: () => causeRoutes
});
module.exports = __toCommonJS(cause_routes_exports);

// src/app/entities/cause/cause.ts
var import_bson = require("bson");
var Cause = class {
  constructor(props, id) {
    this._id = id ?? new import_bson.ObjectId().toHexString();
    this.props = {
      ...props,
      createAt: props.createAt ?? /* @__PURE__ */ new Date()
    };
  }
  set title(title) {
    this.props.title = title;
  }
  set userId(userId) {
    this.props.userId = userId;
  }
  set email(email) {
    this.props.email = email;
  }
  set contact(contact) {
    this.props.contact = contact;
  }
  set location(location) {
    this.props.location = location;
  }
  set description(description) {
    this.props.description = description;
  }
  set createAt(createAt) {
    this.props.createAt = createAt;
  }
  update(data) {
    this.props.title = data.title ?? this.props.title;
    this.props.email = data.email ?? this.props.email;
    this.props.contact = data.contact ?? this.props.contact;
    this.props.location = data.location ?? this.props.location;
    this.props.description = data.description ?? this.props.description;
  }
  get id() {
    return this._id;
  }
  get userId() {
    return this.props.userId;
  }
  get title() {
    return this.props.title;
  }
  get email() {
    return this.props.email;
  }
  get contact() {
    return this.props.contact;
  }
  get description() {
    return this.props.description;
  }
  get location() {
    return this.props.location;
  }
  get createAt() {
    return this.props.createAt;
  }
};

// src/app/use-cases/cause/create-cause.ts
var CreateCause = class {
  constructor(repository) {
    this.repository = repository;
  }
  async execute(request) {
    const data = request;
    const cause = new Cause({
      userId: data.userId,
      title: data.title,
      email: data.email,
      contact: data.contact,
      location: data.location,
      description: data.description
    });
    await this.repository.create(cause);
    return { cause };
  }
};

// src/app/use-cases/cause/get-all-causes.ts
var GetAllCauses = class {
  constructor(repository) {
    this.repository = repository;
  }
  async execute() {
    const causes = await this.repository.getAllCauses();
    return { causes };
  }
};

// src/infra/http/controllers/cause/cause-controllers.ts
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
  constructor(createCause2, getCauses2, getAllCauses, getCauseById, updateCause2, deleteCause2) {
    this.createCause = createCause2;
    this.getCauses = getCauses2;
    this.getAllCauses = getAllCauses;
    this.getCauseById = getCauseById;
    this.updateCause = updateCause2;
    this.deleteCause = deleteCause2;
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

// src/app/use-cases/cause/get-causes-by-userid.ts
var GetCausesByUserId = class {
  constructor(repository) {
    this.repository = repository;
  }
  async execute(request) {
    const { userId } = request;
    const causes = await this.repository.findCausesByUserId(userId);
    if (!causes) {
      throw new Error();
    }
    return { causes };
  }
};

// src/infra/database/prisma-client.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query", "error"]
});

// src/infra/database/mappers/prisma-cause-mappers.ts
var PrismaCauseMappers = class {
  static toPrisma(cause) {
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
  static toDomain(raw) {
    return new Cause({
      userId: raw.userId,
      title: raw.title,
      email: raw.email,
      contact: raw.contact,
      description: raw.description,
      createAt: raw.createAt,
      location: raw.location
    }, raw.id);
  }
};

// src/infra/database/prisma/prisma-cause-repositories.ts
var PrismaCauseRepositories = class {
  async getCauseById(id) {
    const cause = await prisma.cause.findUnique({
      where: {
        id
      }
    });
    if (!cause) {
      throw new Error("Causa n\xE3o encontradas");
    }
    return PrismaCauseMappers.toDomain(cause);
  }
  async getAllCauses() {
    const causes = await prisma.cause.findMany({
      orderBy: {
        createAt: "desc"
      }
    });
    return causes.map((cause) => PrismaCauseMappers.toDomain(cause));
  }
  // Pegando uma causa específica
  async findCausesByUserId(userId) {
    const causes = await prisma.cause.findMany({
      where: {
        userId
      },
      orderBy: {
        createAt: "desc"
      }
    });
    if (!causes) {
      throw new Error("Causas n\xE3o encontradas");
    }
    return causes.map((cause) => PrismaCauseMappers.toDomain(cause));
  }
  // Criação de uma causa
  async create(cause) {
    const raw = PrismaCauseMappers.toPrisma(cause);
    await prisma.cause.create({
      data: raw
    });
  }
  // Atualizando informações de uma causa
  async save(cause) {
    const {
      id,
      title,
      description,
      location,
      email,
      contact
    } = PrismaCauseMappers.toPrisma(cause);
    await prisma.cause.update({
      where: {
        id
      },
      data: {
        title,
        description,
        location,
        email,
        contact
      }
    });
  }
  // Deletando uma causa
  async delete(causeId) {
    await prisma.cause.delete({
      where: {
        id: causeId
      }
    });
  }
};

// src/app/use-cases/cause/get-cause-by-id.ts
var GetCauseById = class {
  constructor(repository) {
    this.repository = repository;
  }
  async execute(request) {
    const { id } = request;
    const cause = await this.repository.getCauseById(id);
    if (!cause) {
      throw new Error("Causa n\xE3o encontrada");
    }
    return { cause };
  }
};

// src/app/use-cases/cause/update-cause.ts
var UpdateCause = class {
  constructor(repository) {
    this.repository = repository;
  }
  async execute(id, request) {
    const { title, description, location, email, contact } = request;
    const cause = await this.repository.getCauseById(id);
    if (!cause) {
      throw new CauseNotFoundError();
    }
    cause.update({
      title,
      description,
      location,
      email,
      contact
    });
    await this.repository.save(cause);
  }
};

// src/app/use-cases/cause/delete-cause.ts
var DeleteCause = class {
  constructor(repository) {
    this.repository = repository;
  }
  async execute(request) {
    const { causeId } = request;
    const cause = await this.repository.getCauseById(causeId);
    if (!cause) {
      throw new CauseNotFoundError();
    }
    await this.repository.delete(causeId);
  }
};

// src/infra/http/controllers/cause/index.ts
var repositories = new PrismaCauseRepositories();
var createCause = new CreateCause(repositories);
var getCauses = new GetCausesByUserId(repositories);
var allCauses = new GetAllCauses(repositories);
var causeById = new GetCauseById(repositories);
var updateCause = new UpdateCause(repositories);
var deleteCause = new DeleteCause(repositories);
var causeController = new CauseController(
  createCause,
  getCauses,
  allCauses,
  causeById,
  updateCause,
  deleteCause
);

// src/infra/http/routes/cause-routes.ts
async function causeRoutes(app) {
  app.post("/cause/create", async (request, reply) => {
    await causeController.create(request, reply);
  });
  app.get("/causes/:userId", async (request, reply) => {
    await causeController.causesByUser(request, reply);
  });
  app.get("/causes", async (request, reply) => {
    await causeController.allCauses(reply);
  });
  app.get("/cause/:id", async (request, reply) => {
    await causeController.causeById(request, reply);
  });
  app.put("/cause/:id", async (request, reply) => {
    await causeController.save(request, reply);
  });
  app.delete("/cause/:causeId", async (request, reply) => {
    await causeController.delete(request, reply);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  causeRoutes
});
