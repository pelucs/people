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

// src/app/use-cases/cause/create-cause.ts
var create_cause_exports = {};
__export(create_cause_exports, {
  CreateCause: () => CreateCause
});
module.exports = __toCommonJS(create_cause_exports);

// src/app/entities/cause/cause.ts
var import_bson = require("bson");
var Cause = class {
  constructor(props, id) {
    this._id = id ?? new import_bson.ObjectId().toHexString();
    this.props = {
      ...props,
      createAt: props.createAt ?? /* @__PURE__ */ new Date()
    };
  }
  set title(title) {
    this.props.title = title;
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
  set expirationAt(expirationAt) {
    this.props.expirationAt = expirationAt;
  }
  set isPublic(isPublic) {
    this.props.isPublic = isPublic;
  }
  set imagesUrl(imagesUrl) {
    this.props.imagesUrl = imagesUrl;
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
    this.props.expirationAt = data.expirationAt ?? this.props.expirationAt;
    this.props.isPublic = data.isPublic ?? this.props.isPublic;
    this.props.imagesUrl = data.imagesUrl ?? this.props.imagesUrl;
  }
  // Causa privada
  publish() {
    this.props.isPublic = true;
  }
  // Causa pública
  unPublish() {
    this.props.isPublic = false;
  }
  get id() {
    return this._id;
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
  get isPublic() {
    return this.props.isPublic;
  }
  get imagesUrl() {
    return this.props.imagesUrl;
  }
  get expirationAt() {
    return this.props.expirationAt;
  }
};

// src/app/use-cases/cause/create-cause.ts
var CreateCause = class {
  constructor(repository) {
    this.repository = repository;
  }
  async execute(request) {
    const data = request;
    const cause = new Cause({
      title: data.title,
      email: data.email,
      contact: data.contact,
      location: data.location,
      description: data.description,
      expirationAt: data.expirationAt,
      imagesUrl: data.imagesUrl,
      isPublic: false
    });
    await this.repository.create(cause);
    return { cause };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateCause
});