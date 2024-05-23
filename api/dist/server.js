"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_config = require("dotenv/config");
var import_fastify = __toESM(require("fastify"));
var import_cors = __toESM(require("@fastify/cors"));

// src/app/exceptions/user-not-found-error.ts
var UserNotFoundError = class extends Error {
  constructor() {
    super("Usu\xE1rio n\xE3o encontrado");
  }
};

// src/app/use-cases/user/get-user.ts
var GetUser = class {
  constructor(repository2) {
    this.repository = repository2;
  }
  async execute(request) {
    const { userId } = request;
    const user = await this.repository.findUserById(userId);
    if (!user) {
      throw new UserNotFoundError();
    }
    return { user };
  }
};

// src/app/use-cases/user/login-user.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_bcrypt = __toESM(require("bcrypt"));

// src/app/exceptions/user-incorrect-password-error.ts
var UserIncorrectPasswordError = class extends Error {
  constructor() {
    super("Senha incorreta");
    this.name = "UserIncorrectPasswordError";
  }
};

// src/app/use-cases/user/login-user.ts
var LoginUser = class {
  constructor(repository2) {
    this.repository = repository2;
  }
  async execute(request) {
    const { email, password } = request;
    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new UserNotFoundError();
    }
    const compareHash = await import_bcrypt.default.compare(password, user.password);
    if (!compareHash) {
      throw new UserIncorrectPasswordError();
    }
    const token = import_jsonwebtoken.default.sign({
      id: user.id,
      name: user.name,
      type: user.type
    }, `${process.env.SECRET_JWT}`, { expiresIn: "1d" });
    return { token };
  }
};

// src/app/use-cases/user/create-user.ts
var import_bcrypt2 = __toESM(require("bcrypt"));

// src/app/entities/user/user.ts
var import_bson = require("bson");
var User = class {
  constructor(props, id) {
    this._id = id ?? new import_bson.ObjectId().toHexString();
    this.props = {
      ...props,
      createAt: props.createAt ?? /* @__PURE__ */ new Date()
    };
  }
  set name(name) {
    this.props.name = name;
  }
  set email(email) {
    this.props.email = email;
  }
  set password(password) {
    this.props.password = password;
  }
  set type(type) {
    this.props.type = type;
  }
  set address(address) {
    this.props.address = address;
  }
  set contact(contact) {
    this.props.contact = contact;
  }
  set createAt(createAt) {
    this.props.createAt = createAt;
  }
  get id() {
    return this._id;
  }
  get name() {
    return this.props.name;
  }
  get email() {
    return this.props.email;
  }
  get password() {
    return this.props.password;
  }
  get type() {
    return this.props.type;
  }
  get createAt() {
    return this.props.createAt;
  }
  get address() {
    return this.props.address;
  }
  get contact() {
    return this.props.contact;
  }
};

// src/app/exceptions/user-already-exists-with-email-error.ts
var UserAlreadyExistsError = class extends Error {
  constructor() {
    super("Usu\xE1rio j\xE1 cadastrado com esse email.");
    this.name = "UserAlreadyExistsError";
  }
};

// src/app/use-cases/user/create-user.ts
var CreateUser = class {
  constructor(repository2) {
    this.repository = repository2;
  }
  async execute(request) {
    const { name, email, password, type } = request;
    const isAlreadyUser = await this.repository.findByEmail(email);
    if (isAlreadyUser) {
      throw new UserAlreadyExistsError();
    }
    const user = new User({
      name,
      email,
      type,
      password: await import_bcrypt2.default.hash(password, 10)
    });
    await this.repository.create(user);
    return { user };
  }
};

// src/app/use-cases/user/update-user.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
var UpdateUser = class {
  constructor(repository2) {
    this.repository = repository2;
  }
  async execute(userId, request) {
    const { name, address, contact, type } = request;
    const isAlreadyExists = await this.repository.findUserById(userId);
    if (!isAlreadyExists) {
      throw new UserNotFoundError();
    }
    await this.repository.update(userId, {
      name,
      type,
      address,
      contact
    });
    const token = import_jsonwebtoken2.default.sign({
      id: userId,
      name,
      type
    }, `${process.env.SECRET_JWT}`, { expiresIn: "1d" });
    return { token };
  }
};

// src/infra/http/controllers/user/user-controllers.ts
var import_zod = require("zod");
var UserControllers = class {
  constructor(createUser2, loginUser2, getUser2, updateUser2) {
    this.createUser = createUser2;
    this.loginUser = loginUser2;
    this.getUser = getUser2;
    this.updateUser = updateUser2;
  }
  // Criação do meu usuário
  async create(request, reply) {
    try {
      const bodySchema = import_zod.z.object({
        name: import_zod.z.string(),
        email: import_zod.z.string().email(),
        password: import_zod.z.string(),
        type: import_zod.z.string()
      });
      const data = bodySchema.parse(request.body);
      await this.createUser.execute(data);
      return reply.status(201).send("Usu\xE1rio criado com sucesso");
    } catch (err) {
      if (err instanceof UserAlreadyExistsError) {
        return reply.status(409).send({ message: err.message });
      }
      return reply.status(400).send({
        message: err || "Erro inesperado"
      });
    }
  }
  // Efetuando login
  async login(request, reply) {
    const bodySchema = import_zod.z.object({
      email: import_zod.z.string().email(),
      password: import_zod.z.string()
    });
    const data = bodySchema.parse(request.body);
    try {
      const { token } = await this.loginUser.execute(data);
      return reply.status(200).send(token);
    } catch (err) {
      if (err instanceof UserIncorrectPasswordError) {
        return reply.status(404).send({ message: err.message });
      }
      return reply.status(400).send({
        message: err || "Erro inesprado"
      });
    }
  }
  // Pegando informações do usuário
  async getInfoUser(request, reply) {
    const paramsSchema = import_zod.z.object({
      userId: import_zod.z.string()
    });
    const data = paramsSchema.parse(request.params);
    try {
      const { user } = await this.getUser.execute(data);
      return reply.status(200).send({
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
        createAt: user.createAt,
        contact: user.contact,
        address: user.address
      });
    } catch (err) {
      if (err instanceof UserNotFoundError) {
        return reply.status(404).send({ message: err.message });
      }
      return reply.status(404).send({
        message: err || "Erro inesprado"
      });
    }
  }
  // Atualizando informações do usuário
  async updateInfoUser(request, reply) {
    const paramsSchema = import_zod.z.object({
      userId: import_zod.z.string()
    });
    const bodySchema = import_zod.z.object({
      name: import_zod.z.string(),
      address: import_zod.z.string(),
      contact: import_zod.z.string(),
      type: import_zod.z.string()
    });
    const data = bodySchema.parse(request.body);
    const { userId } = paramsSchema.parse(request.params);
    try {
      const { token } = await this.updateUser.execute(userId, data);
      return reply.status(200).send(token);
    } catch (err) {
      if (err instanceof UserNotFoundError) {
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

// src/infra/database/mappers/prisma-user-mappers.ts
var PrismaUserMappers = class {
  static toPrisma(user) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      type: user.type,
      createAt: user.createAt,
      contact: user.contact,
      address: user.address
    };
  }
  static toDomain(raw) {
    return new User({
      name: raw.name,
      email: raw.email,
      password: raw.password,
      type: raw.type,
      createAt: raw.createAt,
      contact: raw.contact,
      address: raw.address
    }, raw.id);
  }
};

// src/infra/database/prisma/prisma-user-repositories.ts
var PrismaUserRepositories = class {
  // Buscar um usuário pelo email
  async findByEmail(email) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });
    if (!user) {
      return null;
    }
    return PrismaUserMappers.toDomain(user);
  }
  // Buscando um usuário pelo id
  async findUserById(userId) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });
    if (!user) {
      return null;
    }
    return PrismaUserMappers.toDomain(user);
  }
  // Atualizando as informações do usuário
  async update(userId, data) {
    const { name, type, address, contact } = data;
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        name,
        type,
        address,
        contact
      }
    });
  }
  // Criando um usuário
  async create(user) {
    const raw = PrismaUserMappers.toPrisma(user);
    await prisma.user.create({
      data: raw
    });
  }
};

// src/infra/http/controllers/user/index.ts
var repository = new PrismaUserRepositories();
var getUser = new GetUser(repository);
var loginUser = new LoginUser(repository);
var updateUser = new UpdateUser(repository);
var createUser = new CreateUser(repository);
var userController = new UserControllers(createUser, loginUser, getUser, updateUser);

// src/infra/http/routes/user-routes.ts
async function userRoutes(app2) {
  app2.post("/register", async (request, reply) => {
    await userController.create(request, reply);
  });
  app2.post("/login", async (request, reply) => {
    await userController.login(request, reply);
  });
  app2.get("/user/:userId", async (request, reply) => {
    await userController.getInfoUser(request, reply);
  });
  app2.put("/user/:userId/update", async (request, reply) => {
    await userController.updateInfoUser(request, reply);
  });
}

// src/app/entities/cause/cause.ts
var import_bson2 = require("bson");
var Cause = class {
  constructor(props, id) {
    this._id = id ?? new import_bson2.ObjectId().toHexString();
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
  constructor(repository2) {
    this.repository = repository2;
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
  constructor(repository2) {
    this.repository = repository2;
  }
  async execute() {
    const causes = await this.repository.getAllCauses();
    return { causes };
  }
};

// src/infra/http/controllers/cause/cause-controllers.ts
var import_zod2 = require("zod");

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
      const bodySchema = import_zod2.z.object({
        userId: import_zod2.z.string(),
        title: import_zod2.z.string(),
        email: import_zod2.z.string(),
        contact: import_zod2.z.string(),
        location: import_zod2.z.string(),
        description: import_zod2.z.string()
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
      const paramsSchema = import_zod2.z.object({
        userId: import_zod2.z.string()
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
      const paramsSchema = import_zod2.z.object({
        id: import_zod2.z.string()
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
      const bodySchema = import_zod2.z.object({
        title: import_zod2.z.string().nullish(),
        description: import_zod2.z.string().nullish(),
        email: import_zod2.z.string().nullish(),
        contact: import_zod2.z.string().nullish(),
        location: import_zod2.z.string().nullish()
      });
      const paramsSchema = import_zod2.z.object({
        id: import_zod2.z.string()
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
      const paramsSchema = import_zod2.z.object({
        causeId: import_zod2.z.string()
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
  constructor(repository2) {
    this.repository = repository2;
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
  constructor(repository2) {
    this.repository = repository2;
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
  constructor(repository2) {
    this.repository = repository2;
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
  constructor(repository2) {
    this.repository = repository2;
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
async function causeRoutes(app2) {
  app2.post("/cause/create", async (request, reply) => {
    await causeController.create(request, reply);
  });
  app2.get("/causes/:userId", async (request, reply) => {
    await causeController.causesByUser(request, reply);
  });
  app2.get("/causes", async (request, reply) => {
    await causeController.allCauses(reply);
  });
  app2.get("/cause/:id", async (request, reply) => {
    await causeController.causeById(request, reply);
  });
  app2.put("/cause/:id", async (request, reply) => {
    await causeController.save(request, reply);
  });
  app2.delete("/cause/:causeId", async (request, reply) => {
    await causeController.delete(request, reply);
  });
}

// src/server.ts
var app = (0, import_fastify.default)();
app.register(import_cors.default, {
  origin: "*"
});
app.register(userRoutes);
app.register(causeRoutes);
app.listen({
  host: "0.0.0.0",
  port: process.env.PORT ? Number(process.env.PORT) : 3333
}).then(() => {
  console.log("HTTP Server Running!");
});
