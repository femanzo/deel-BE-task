"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Contract extends sequelize_1.Model {
}
exports.default = (sequelize) => Contract.init({
    terms: {
        type: sequelize_1.TEXT,
        allowNull: false,
    },
    status: {
        type: (0, sequelize_1.ENUM)('new', 'in_progress', 'terminated'),
    },
}, {
    scopes: {
        pending: {
            where: { status: { [sequelize_1.Op.not]: 'terminated' } },
        },
        active: {
            where: { status: 'in_progress' },
        },
    },
    sequelize,
    modelName: 'Contract',
});
