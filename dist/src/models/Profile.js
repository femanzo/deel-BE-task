"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
require("reflect-metadata");
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const _1 = require("./");
var ProfileTypes;
(function (ProfileTypes) {
    ProfileTypes["CLIENT"] = "client";
    ProfileTypes["CONTRACTOR"] = "contractor";
})(ProfileTypes || (ProfileTypes = {}));
let Profile = class Profile extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false }),
    __metadata("design:type", String)
], Profile.prototype, "firstName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false }),
    __metadata("design:type", String)
], Profile.prototype, "lastName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false }),
    __metadata("design:type", String)
], Profile.prototype, "profession", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: (0, sequelize_1.DECIMAL)(12, 2) }),
    __metadata("design:type", Number)
], Profile.prototype, "balance", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Profile.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => _1.Contract, { as: 'Contractor', foreignKey: 'ContractorId' }),
    (0, sequelize_typescript_1.HasMany)(() => _1.Contract, { as: 'Client', foreignKey: 'ClientId' }),
    __metadata("design:type", Array)
], Profile.prototype, "contracts", void 0);
Profile = __decorate([
    sequelize_typescript_1.Table
], Profile);
exports.Profile = Profile;
