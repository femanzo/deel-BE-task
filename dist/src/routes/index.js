"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contracts_router_1 = __importDefault(require("./contracts-router"));
const jobs_router_1 = __importDefault(require("./jobs-router"));
const balances_router_1 = __importDefault(require("./balances-router"));
const admin_router_1 = __importDefault(require("./admin-router"));
const router = (0, express_1.Router)()
    .use('/contracts', contracts_router_1.default)
    .use('/jobs', jobs_router_1.default)
    .use('/balances', balances_router_1.default)
    .use('/admin', admin_router_1.default);
exports.default = router;
