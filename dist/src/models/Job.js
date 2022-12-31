"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Job extends sequelize_1.Model {
}
exports.default = (sequelize) => Job.init({
    description: {
        type: sequelize_1.TEXT,
        allowNull: false,
    },
    price: {
        type: (0, sequelize_1.DECIMAL)(12, 2),
        allowNull: false,
    },
    paid: {
        type: sequelize_1.BOOLEAN,
        defaultValue: false,
    },
    paymentDate: {
        type: sequelize_1.DATE,
    },
}, {
    scopes: {
        unpaid: {
            where: {
                paid: {
                    [sequelize_1.Op.or]: [false, null],
                },
            },
        },
        paid: {
            where: {
                paid: true,
            },
        },
    },
    sequelize,
    modelName: 'Job',
});
