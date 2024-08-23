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

// src/app/use-cases/cause/get-all-causes.ts
var get_all_causes_exports = {};
__export(get_all_causes_exports, {
  GetAllCauses: () => GetAllCauses
});
module.exports = __toCommonJS(get_all_causes_exports);
var GetAllCauses = class {
  constructor(repository) {
    this.repository = repository;
  }
  async execute(query) {
    const causes = await this.repository.getAllCauses(query);
    return { causes };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetAllCauses
});
