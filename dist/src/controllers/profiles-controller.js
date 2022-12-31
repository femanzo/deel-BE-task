"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.depositFundsRequest = void 0;
const utils_1 = require("../utils");
const services_1 = require("../services");
const { depositFunds } = services_1.profileServices;
const depositFundsRequest = async (req, res, next) => {
    const { userId } = req.params;
    const { amount } = req.body;
    if (!userId || !amount)
        throw new utils_1.ApiError('Invalid parameters', 400);
    try {
        const result = await depositFunds(Number(userId), Number(amount));
        return res.json(result);
    }
    catch (err) {
        return next(err);
    }
};
exports.depositFundsRequest = depositFundsRequest;
