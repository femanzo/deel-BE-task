"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("./models");
const sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite3',
});
exports.sequelize = sequelize;
(0, models_1.initModels)(sequelize);
