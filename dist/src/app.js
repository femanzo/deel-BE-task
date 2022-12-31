"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const db_1 = require("./db");
const routes_1 = __importDefault(require("./routes"));
const middlewares_1 = require("./middlewares");
const app = (0, express_1.default)();
const { errorLogger, errorResponder } = middlewares_1.errorHandler;
app.set('sequelize', db_1.sequelize);
/**
 * Keep it safe!
 * @see https://expressjs.com/en/resources/middleware/cors.html
 * @see https://expressjs.com/en/resources/middleware/helmet.html
 */
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
/**
 * Keep it fast!
 * @see https://expressjs.com/en/resources/middleware/compression.html
 */
app.use((0, compression_1.default)());
/**
 * @see https://expressjs.com/en/resources/middleware/body-parser.html
 */
app.use(body_parser_1.default.json());
app.use('/', routes_1.default);
/**
 * These must be the last middlewares
 * Order matters!
 */
app.use(errorLogger);
app.use(errorResponder);
exports.default = app;
