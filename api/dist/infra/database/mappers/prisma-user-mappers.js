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

// src/infra/database/mappers/prisma-user-mappers.ts
var prisma_user_mappers_exports = {};
__export(prisma_user_mappers_exports, {
  PrismaUserMappers: () => PrismaUserMappers
});
module.exports = __toCommonJS(prisma_user_mappers_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PrismaUserMappers
});
