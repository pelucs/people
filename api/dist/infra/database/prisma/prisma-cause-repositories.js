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

// src/infra/database/prisma/prisma-cause-repositories.ts
var prisma_cause_repositories_exports = {};
__export(prisma_cause_repositories_exports, {
  PrismaCauseRepositories: () => PrismaCauseRepositories
});
module.exports = __toCommonJS(prisma_cause_repositories_exports);

// src/infra/database/prisma-client.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query", "error"]
});

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PrismaCauseRepositories
});
