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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PrismaCauseRepositories
});
