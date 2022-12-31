"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeMultiply = exports.safeSubtract = exports.safeAdd = void 0;
const decimal_js_1 = require("decimal.js");
/**
 * Adds two numbers avoiding floating point errors
 * @param {number} a
 * @param {number} b
 * @returns {number} a + b
 */
const safeAdd = (a, b) => {
    return Number(new decimal_js_1.Decimal(a).add(b));
};
exports.safeAdd = safeAdd;
/**
 * Subtracts two numbers avoiding floating point errors
 * @param {number} a
 * @param {number} b
 * @returns {number} a - b
 */
const safeSubtract = (a, b) => {
    return Number(new decimal_js_1.Decimal(a).sub(b));
};
exports.safeSubtract = safeSubtract;
/**
 * Multiplies two numbers avoiding floating point errors
 * @param {number} a
 * @param {number} b
 * @returns {number} a * b
 */
const safeMultiply = (a, b) => {
    return Number(new decimal_js_1.Decimal(a).mul(b));
};
exports.safeMultiply = safeMultiply;
