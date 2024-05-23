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

// src/app/entities/cause/cause.ts
var cause_exports = {};
__export(cause_exports, {
  Cause: () => Cause
});
module.exports = __toCommonJS(cause_exports);
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
  set userId(userId) {
    this.props.userId = userId;
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
  set createAt(createAt) {
    this.props.createAt = createAt;
  }
  update(data) {
    this.props.title = data.title ?? this.props.title;
    this.props.email = data.email ?? this.props.email;
    this.props.contact = data.contact ?? this.props.contact;
    this.props.location = data.location ?? this.props.location;
    this.props.description = data.description ?? this.props.description;
  }
  get id() {
    return this._id;
  }
  get userId() {
    return this.props.userId;
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
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Cause
});
