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

// src/app/use-cases/user/login-user.ts
var login_user_exports = {};
__export(login_user_exports, {
  LoginUser: () => LoginUser
});
module.exports = __toCommonJS(login_user_exports);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_bcrypt = __toESM(require("bcrypt"));

// src/app/exceptions/user-not-found-error.ts
var UserNotFoundError = class extends Error {
  constructor() {
    super("Usu\xE1rio n\xE3o encontrado");
  }
};

// src/app/exceptions/user-incorrect-password-error.ts
var UserIncorrectPasswordError = class extends Error {
  constructor() {
    super("Senha incorreta");
    this.name = "UserIncorrectPasswordError";
  }
};

// src/app/use-cases/user/login-user.ts
var LoginUser = class {
  constructor(repository) {
    this.repository = repository;
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LoginUser
});
