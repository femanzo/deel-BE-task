"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Profile_1 = require("./models/Profile");
const Contract_1 = require("./models/Contract");
const Job_1 = require("./models/Job");
exports.sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite3',
    models: [Profile_1.Profile, Contract_1.Contract, Job_1.Job],
});
