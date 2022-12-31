"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
exports.default = (0, express_1.Router)()
    .get('/unpaid', middlewares_1.getProfile, controllers_1.jobsController.getUserUnpaidJobsRequest)
    .post('/:job_id/pay', middlewares_1.getProfile, controllers_1.jobsController.payJobRequest);
