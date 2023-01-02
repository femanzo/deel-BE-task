"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract = exports.Profile = exports.Job = void 0;
const Job_1 = require("./Job");
Object.defineProperty(exports, "Job", { enumerable: true, get: function () { return Job_1.Job; } });
const Profile_1 = require("./Profile");
Object.defineProperty(exports, "Profile", { enumerable: true, get: function () { return Profile_1.Profile; } });
const Contract_1 = require("./Contract");
Object.defineProperty(exports, "Contract", { enumerable: true, get: function () { return Contract_1.Contract; } });
// Profile.hasMany(Contract, { as: 'Contractor', foreignKey: 'ContractorId' })
// Contract.belongsTo(Profile, { as: 'Contractor' })
// Profile.hasMany(Contract, { as: 'Client', foreignKey: 'ClientId' })
// Contract.belongsTo(Profile, { as: 'Client' })
// Contract.hasMany(Job)
// Job.belongsTo(Contract)
