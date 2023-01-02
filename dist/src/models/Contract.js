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
exports.Contract = void 0;
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const _1 = require("./");
var ContractStatus;
(function (ContractStatus) {
    ContractStatus["NEW"] = "new";
    ContractStatus["IN_PROGRESS"] = "in_progress";
    ContractStatus["TERMINATED"] = "terminated";
})(ContractStatus || (ContractStatus = {}));
let Contract = class Contract extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Contract.prototype, "terms", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Contract.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => _1.Job, { foreignKey: 'ContractId' }),
    __metadata("design:type", Object)
], Contract.prototype, "jobs", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => _1.Profile),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Contract.prototype, "ClientId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => _1.Profile, { foreignKey: 'ClientId' }),
    __metadata("design:type", Object)
], Contract.prototype, "client", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => _1.Profile),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Contract.prototype, "ContractorId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => _1.Profile, { foreignKey: 'ContractorId' }),
    __metadata("design:type", Object)
], Contract.prototype, "contractor", void 0);
Contract = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
    }),
    (0, sequelize_typescript_1.Scopes)(() => ({
        pending: { where: { status: { [sequelize_1.Op.not]: ContractStatus.TERMINATED } } },
        active: { where: { status: ContractStatus.IN_PROGRESS } },
    }))
], Contract);
exports.Contract = Contract;
