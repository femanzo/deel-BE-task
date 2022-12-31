"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertRecordFound = exports.ApiError = void 0;
class ApiError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.ApiError = ApiError;
/**
 * This function will throw an error if the model does not exist
 * @param {any} record object to check if it exists
 * @param {string} name to use in the error message
 * @param {number | string} id to use in the error message
 */
const assertRecordFound = (record, name, id) => {
    if (!record) {
        throw new ApiError(`${name} #${id} not found`, 404);
    }
};
exports.assertRecordFound = assertRecordFound;
