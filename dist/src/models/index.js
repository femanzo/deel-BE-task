"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModels = void 0;
const Contract_1 = __importDefault(require("./Contract"));
const Job_1 = __importDefault(require("./Job"));
const Profile_1 = __importDefault(require("./Profile"));
const initModels = (sequelize) => {
    /**
     * Execute models initializers
     */
    (0, Contract_1.default)(sequelize);
    (0, Job_1.default)(sequelize);
    (0, Profile_1.default)(sequelize);
    /**
     * Relationships definition
     */
    const { Profile, Contract, Job } = sequelize.models;
    Profile.hasMany(Contract, { as: 'Contractor', foreignKey: 'ContractorId' });
    Contract.belongsTo(Profile, { as: 'Contractor' });
    Profile.hasMany(Contract, { as: 'Client', foreignKey: 'ClientId' });
    Contract.belongsTo(Profile, { as: 'Client' });
    Contract.hasMany(Job);
    Job.belongsTo(Contract);
};
exports.initModels = initModels;
