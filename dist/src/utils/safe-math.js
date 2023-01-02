"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeToFixed = exports.safeMultiply = exports.safeSubtract = exports.safeAdd = void 0;
const decimal_js_1 = require("decimal.js");
/**
 * Adds two numbers avoiding floating point errors
 * @param {number} a
 * @param {number} b
 * @returns {number} a + b
 */
const safeAdd = (a, b) => {
    return new decimal_js_1.Decimal(a).add(b).toNumber();
};
exports.safeAdd = safeAdd;
/**
 * Subtracts two numbers avoiding floating point errors
 * @param {number} a
 * @param {number} b
 * @returns {number} a - b
 */
const safeSubtract = (a, b) => {
    return new decimal_js_1.Decimal(a).sub(b).toNumber();
};
exports.safeSubtract = safeSubtract;
/**
 * Multiplies two numbers avoiding floating point errors
 * @param {number} a
 * @param {number} b
 * @returns {number} a * b
 */
const safeMultiply = (a, b) => {
    return new decimal_js_1.Decimal(a).mul(b).toNumber();
};
exports.safeMultiply = safeMultiply;
/**
 * Round the number to the specified number of decimal places
 * @param {number} amount
 * @param {number} decimals
 * @returns {number} 2.12345 => 2.12
 */
const safeToFixed = (amount, decimals) => {
    return new decimal_js_1.Decimal(amount).toDecimalPlaces(decimals).toNumber();
};
exports.safeToFixed = safeToFixed;
