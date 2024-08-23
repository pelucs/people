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

// src/app/use-cases/cause/delete-cause.ts
var delete_cause_exports = {};
__export(delete_cause_exports, {
  DeleteCause: () => DeleteCause
});
module.exports = __toCommonJS(delete_cause_exports);

// src/app/exceptions/cause-not-found-error.ts
var CauseNotFoundError = class extends Error {
  constructor() {
    super("Causa n\xE3o encontrada");
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeleteCause
});
