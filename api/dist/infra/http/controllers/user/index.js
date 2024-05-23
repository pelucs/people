"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/infra/http/controllers/user/index.ts
var user_exports = {};
__export(user_exports, {
  createUser: () => createUser,
  getUser: () => getUser,
  loginUser: () => loginUser,
  updateUser: () => updateUser,
  userController: () => userController
});
module.exports = __toCommonJS(user_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createUser,
  getUser,
  loginUser,
  updateUser,
  userController
});
