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

// src/app/use-cases/user/create-user.ts
var create_user_exports = {};
__export(create_user_exports, {
  CreateUser: () => CreateUser
});
module.exports = __toCommonJS(create_user_exports);
var import_bcrypt = __toESM(require("bcrypt"));

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
  constructor(repository) {
    this.repository = repository;
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
      password: await import_bcrypt.default.hash(password, 10)
    });
    await this.repository.create(user);
    return { user };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateUser
});
