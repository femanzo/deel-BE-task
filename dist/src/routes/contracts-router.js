"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
exports.default = (0, express_1.Router)()
    .get('/', middlewares_1.getProfile, controllers_1.contractsController.getUserNonTerminantedContractsRequest)
    .get('/:id', middlewares_1.getProfile, controllers_1.contractsController.getProfileContractByIdRequest);
