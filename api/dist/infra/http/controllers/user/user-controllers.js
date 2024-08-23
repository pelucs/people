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

// src/infra/http/controllers/user/user-controllers.ts
var user_controllers_exports = {};
__export(user_controllers_exports, {
  UserControllers: () => UserControllers
});
module.exports = __toCommonJS(user_controllers_exports);
var import_zod = require("zod");

// src/app/exceptions/user-not-found-error.ts
var UserNotFoundError = class extends Error {
  constructor() {
    super("Usu\xE1rio n\xE3o encontrado");
  }
};

// src/app/exceptions/user-already-exists-with-email-error.ts
var UserAlreadyExistsError = class extends Error {
  constructor() {
    super("Usu\xE1rio j\xE1 cadastrado com esse email.");
    this.name = "UserAlreadyExistsError";
  }
};

// src/app/exceptions/user-incorrect-password-error.ts
var UserIncorrectPasswordError = class extends Error {
  constructor() {
    super("Senha incorreta");
    this.name = "UserIncorrectPasswordError";
  }
};

// src/infra/http/controllers/user/user-controllers.ts
var UserControllers = class {
  constructor(createUser, loginUser, getUser, updateUser) {
    this.createUser = createUser;
    this.loginUser = loginUser;
    this.getUser = getUser;
    this.updateUser = updateUser;
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
        type: user.type
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserControllers
});
