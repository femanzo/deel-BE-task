"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBestProfessionRequest = exports.getBestClientsRequest = void 0;
const services_1 = require("../services");
const utils_1 = require("../utils");
const { getBestClients, getBestProfession } = services_1.adminServices;
const getBestClientsRequest = async (req, res, next) => {
    const { start, end } = req.query;
    if (!start)
        return next(new utils_1.ApiError(`Param 'start' is required`, 400));
    if (!end)
        return next(new utils_1.ApiError(`Param 'end' is required`, 400));
    let limit = 2;
    if (req.query.limit) {
        limit = Number(req.query.limit);
        if (limit === 0)
            limit = 2;
    }
    const startDate = new Date(start);
    const endDate = new Date(end);
    try {
        const result = await getBestClients(startDate, endDate, limit);
        return res.json(result);
    }
    catch (err) {
        return next(err);
    }
};
exports.getBestClientsRequest = getBestClientsRequest;
const getBestProfessionRequest = async (req, res, next) => {
    const { start, end } = req.query;
    if (!start)
        return next(new utils_1.ApiError(`Param 'start' is required`, 400));
    if (!end)
        return next(new utils_1.ApiError(`Param 'end' is required`, 400));
    const startDate = new Date(start);
    const endDate = new Date(end);
    try {
        const result = await getBestProfession(startDate, endDate);
        return res.json(result);
    }
    catch (err) {
        return next(err);
    }
};
exports.getBestProfessionRequest = getBestProfessionRequest;
