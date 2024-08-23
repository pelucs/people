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

// src/infra/http/view-models/cause-view-model.ts
var cause_view_model_exports = {};
__export(cause_view_model_exports, {
  CauseViewModelMapper: () => CauseViewModelMapper
});
module.exports = __toCommonJS(cause_view_model_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CauseViewModelMapper
});
