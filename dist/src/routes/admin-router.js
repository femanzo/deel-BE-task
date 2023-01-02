"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.get('/best-clients', (0, middlewares_1.validateQuery)(['start', 'end']), controllers_1.adminController.getBestClientsRequest);
router.get('/best-profession', (0, middlewares_1.validateQuery)(['start', 'end']), controllers_1.adminController.getBestProfessionRequest);
exports.default = router;
