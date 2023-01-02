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
exports.Job = void 0;
require("reflect-metadata");
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const _1 = require("./");
let Job = class Job extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Job.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Job.prototype, "price", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Job.prototype, "paid", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Job.prototype, "paymentDate", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => _1.Contract),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Job.prototype, "ContractId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => _1.Contract, { foreignKey: 'ContractId' }),
    __metadata("design:type", Object)
], Job.prototype, "contract", void 0);
Job = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
    }),
    (0, sequelize_typescript_1.Scopes)(() => ({
        unpaid: { where: { paid: { [sequelize_1.Op.or]: [false, null] } } },
        paid: { where: { paid: true } },
    }))
], Job);
exports.Job = Job;
