"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQuery = void 0;
const utils_1 = require("../utils");
/**
 * Middleware to validate request query
 * @param {function(string[])} fields - The fields to validate
 * ex: validateQuery(['start', 'end'])
 */
const validateQuery = (fields) => {
    return (req, res, next) => {
        for (const field of fields) {
            if (!req.query[field]) {
                return next(new utils_1.ApiError(`Param '${field}' is required`, 400));
            }
        }
        return next();
    };
};
exports.validateQuery = validateQuery;
