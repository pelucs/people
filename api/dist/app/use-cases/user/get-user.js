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

// src/app/use-cases/user/get-user.ts
var get_user_exports = {};
__export(get_user_exports, {
  GetUser: () => GetUser
});
module.exports = __toCommonJS(get_user_exports);

// src/app/exceptions/user-not-found-error.ts
var UserNotFoundError = class extends Error {
  constructor() {
    super("Usu\xE1rio n\xE3o encontrado");
  }
};

// src/app/use-cases/user/get-user.ts
var GetUser = class {
  constructor(repository) {
    this.repository = repository;
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetUser
});
