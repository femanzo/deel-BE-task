"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidTimeRange = exports.isValidDate = void 0;
/**
 * Check if date is valid js Date object
 * @param {Date} date
 * @returns {boolean}
 */
const isValidDate = (date) => {
    if (Object.prototype.toString.call(date) === '[object Date]') {
        if (!isNaN(date.getTime())) {
            return true;
        }
    }
    return false;
};
exports.isValidDate = isValidDate;
/**
 * Check if start date is before end date
 * @param {Date} start
 * @param {Date} end
 * @returns {boolean}
 */
const isValidTimeRange = (start, end) => {
    if (!(0, exports.isValidDate)(start) || !(0, exports.isValidDate)(end)) {
        return false;
    }
    return start.getTime() <= end.getTime();
};
exports.isValidTimeRange = isValidTimeRange;
