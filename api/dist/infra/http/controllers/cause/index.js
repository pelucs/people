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

// src/infra/http/controllers/cause/index.ts
var cause_exports = {};
__export(cause_exports, {
  allCauses: () => allCauses,
  causeById: () => causeById,
  causeController: () => causeController,
  createCause: () => createCause,
  deleteCause: () => deleteCause,
  publishCause: () => publishCause,
  unPublishCause: () => unPublishCause
});
module.exports = __toCommonJS(cause_exports);

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
  set expirationAt(expirationAt) {
    this.props.expirationAt = expirationAt;
  }
  set isPublic(isPublic) {
    this.props.isPublic = isPublic;
  }
  set imagesUrl(imagesUrl) {
    this.props.imagesUrl = imagesUrl;
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
    this.props.expirationAt = data.expirationAt ?? this.props.expirationAt;
    this.props.isPublic = data.isPublic ?? this.props.isPublic;
    this.props.imagesUrl = data.imagesUrl ?? this.props.imagesUrl;
  }
  // Causa privada
  publish() {
    this.props.isPublic = true;
  }
  // Causa pública
  unPublish() {
    this.props.isPublic = false;
  }
  get id() {
    return this._id;
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
  get isPublic() {
    return this.props.isPublic;
  }
  get imagesUrl() {
    return this.props.imagesUrl;
  }
  get expirationAt() {
    return this.props.expirationAt;
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
      title: data.title,
      email: data.email,
      contact: data.contact,
      location: data.location,
      description: data.description,
      expirationAt: data.expirationAt,
      imagesUrl: data.imagesUrl,
      isPublic: false
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
  async execute(query) {
    const causes = await this.repository.getAllCauses(query);
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
      title: cause.title,
      email: cause.email,
      contact: cause.contact,
      description: cause.description,
      location: cause.location,
      createAt: cause.createAt,
      expirationAt: cause.expirationAt,
      imagesUrl: cause.imagesUrl,
      isPublic: cause.isPublic
    };
  }
};

// src/infra/http/controllers/cause/cause-controllers.ts
var CauseController = class {
  constructor(createCause2, getAllCauses, getCauseById, updateCause2, deleteCause2, publishCause2, unPublishCause2) {
    this.createCause = createCause2;
    this.getAllCauses = getAllCauses;
    this.getCauseById = getCauseById;
    this.updateCause = updateCause2;
    this.deleteCause = deleteCause2;
    this.publishCause = publishCause2;
    this.unPublishCause = unPublishCause2;
  }
  // Criação de uma causa
  async create(request, reply) {
    try {
      const bodySchema = import_zod.z.object({
        title: import_zod.z.string(),
        email: import_zod.z.string(),
        contact: import_zod.z.string(),
        location: import_zod.z.string(),
        description: import_zod.z.string(),
        expirationAt: import_zod.z.coerce.date(),
        imagesUrl: import_zod.z.coerce.string().array()
      });
      const data = bodySchema.parse(request.body);
      const { cause } = await this.createCause.execute({
        title: data.title,
        email: data.email,
        contact: data.contact,
        location: data.location,
        description: data.description,
        expirationAt: data.expirationAt,
        imagesUrl: data.imagesUrl
      });
      return reply.status(201).send({
        message: "Causa criada com sucesso",
        id: cause.id
      });
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
  // Resgatando todas as causas públicas
  async allPublicCauses(request, reply) {
    try {
      const paramsSchema = import_zod.z.object({
        query: import_zod.z.string().nullish()
      });
      const { query } = paramsSchema.parse(request.query);
      const { causes } = await this.getAllCauses.execute(query);
      const publicCauses = causes.filter((cause) => cause.isPublic === true);
      reply.status(200).send(
        publicCauses.map((cause) => CauseViewModelMapper.toHttp(cause))
      );
    } catch (err) {
      reply.status(400).send(err);
    }
  }
  // Regatando causa única
  async causeById(request, reply) {
    try {
      const paramsSchema = import_zod.z.object({
        causeId: import_zod.z.string()
      });
      const { causeId } = paramsSchema.parse(request.params);
      const { cause } = await this.getCauseById.execute({ causeId });
      reply.status(200).send(CauseViewModelMapper.toHttp(cause));
    } catch (err) {
      reply.status(404).send("Causa n\xE3o encontrada");
    }
  }
  // Tornando pública uma causa
  async publish(request, reply) {
    try {
      const paramsSchema = import_zod.z.object({
        causeId: import_zod.z.string()
      });
      const { causeId } = paramsSchema.parse(request.params);
      await this.publishCause.execute({ causeId });
      reply.status(200).send();
    } catch (err) {
      if (err instanceof CauseNotFoundError) {
        return reply.status(404).send({ message: err.message });
      }
      return reply.status(404).send({
        message: err || "Erro inesprado"
      });
    }
  }
  // Tornando pública uma causa
  async unPublish(request, reply) {
    try {
      const paramsSchema = import_zod.z.object({
        causeId: import_zod.z.string()
      });
      const { causeId } = paramsSchema.parse(request.params);
      await this.unPublishCause.execute({ causeId });
      reply.status(200).send();
    } catch (err) {
      if (err instanceof CauseNotFoundError) {
        return reply.status(404).send({ message: err.message });
      }
      return reply.status(404).send({
        message: err || "Erro inesprado"
      });
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
        location: import_zod.z.string().nullish(),
        imagesUrl: import_zod.z.string().array().nullish()
      });
      const paramsSchema = import_zod.z.object({
        causeId: import_zod.z.string()
      });
      const { causeId } = paramsSchema.parse(request.params);
      const data = bodySchema.parse(request.body);
      const filteredData = Object.fromEntries(
        Object.entries({
          title: data.title,
          description: data.description,
          location: data.location,
          contact: data.contact,
          email: data.email,
          imagesUrl: data.imagesUrl
        }).filter(([_, value]) => value !== void 0 && value !== null && value !== "")
      );
      console.log(filteredData);
      await this.updateCause.execute(causeId, filteredData);
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
      title: cause.title,
      email: cause.email,
      contact: cause.contact,
      description: cause.description,
      location: cause.location,
      createAt: cause.createAt,
      expirationAt: cause.expirationAt,
      imagesUrl: cause.imagesUrl,
      isPublic: cause.isPublic
    };
  }
  static toDomain(raw) {
    return new Cause({
      title: raw.title,
      email: raw.email,
      contact: raw.contact,
      description: raw.description,
      createAt: raw.createAt,
      location: raw.location,
      expirationAt: raw.expirationAt,
      isPublic: raw.isPublic,
      imagesUrl: raw.imagesUrl
    }, raw.id);
  }
};

// src/infra/database/prisma/prisma-cause-repositories.ts
var PrismaCauseRepositories = class {
  // Resgatando uma causa específica
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
  //Regatando as causas
  async getAllCauses(query) {
    const causes = await prisma.cause.findMany({
      where: query ? {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive"
            }
          },
          {
            description: {
              contains: query,
              mode: "insensitive"
            }
          }
        ]
      } : {},
      orderBy: {
        createAt: "desc"
      }
    });
    return causes.map((cause) => PrismaCauseMappers.toDomain(cause));
  }
  // Criando uma causa
  async create(cause) {
    const raw = PrismaCauseMappers.toPrisma(cause);
    await prisma.cause.create({
      data: raw
    });
  }
  // Atualizando informações de uma causa
  async save(cause) {
    const raw = PrismaCauseMappers.toPrisma(cause);
    const { id, ...data } = raw;
    await prisma.cause.update({
      where: {
        id
      },
      data
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
    const { causeId } = request;
    const cause = await this.repository.getCauseById(causeId);
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
  async execute(causeId, request) {
    const { title, description, location, email, contact, imagesUrl } = request;
    const cause = await this.repository.getCauseById(causeId);
    if (!cause) {
      throw new CauseNotFoundError();
    }
    cause.update({
      title,
      description,
      location,
      email,
      contact,
      imagesUrl
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

// src/app/use-cases/cause/publish-cause.ts
var PublishCause = class {
  constructor(repository) {
    this.repository = repository;
  }
  async execute(request) {
    const { causeId } = request;
    const cause = await this.repository.getCauseById(causeId);
    if (!cause) {
      throw new CauseNotFoundError();
    }
    cause.publish();
    await this.repository.save(cause);
  }
};

// src/app/use-cases/cause/unpublish-cause.ts
var UnPublishCause = class {
  constructor(repository) {
    this.repository = repository;
  }
  async execute(request) {
    const { causeId } = request;
    const cause = await this.repository.getCauseById(causeId);
    if (!cause) {
      throw new CauseNotFoundError();
    }
    cause.unPublish();
    await this.repository.save(cause);
  }
};

// src/infra/http/controllers/cause/index.ts
var repositories = new PrismaCauseRepositories();
var createCause = new CreateCause(repositories);
var allCauses = new GetAllCauses(repositories);
var causeById = new GetCauseById(repositories);
var updateCause = new UpdateCause(repositories);
var deleteCause = new DeleteCause(repositories);
var publishCause = new PublishCause(repositories);
var unPublishCause = new UnPublishCause(repositories);
var causeController = new CauseController(
  createCause,
  allCauses,
  causeById,
  updateCause,
  deleteCause,
  publishCause,
  unPublishCause
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  allCauses,
  causeById,
  causeController,
  createCause,
  deleteCause,
  publishCause,
  unPublishCause
});
