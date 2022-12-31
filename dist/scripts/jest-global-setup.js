"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const seed_db_1 = require("./seed-db");
exports.default = async () => {
    console.log('\nseed db before tests');
    await (0, seed_db_1.seed)();
};
