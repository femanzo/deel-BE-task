"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Profile extends sequelize_1.Model {
}
exports.default = (sequelize) => Profile.init({
    firstName: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    profession: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    balance: {
        type: (0, sequelize_1.DECIMAL)(12, 2),
    },
    type: {
        type: (0, sequelize_1.ENUM)('client', 'contractor'),
    },
}, {
    sequelize,
    modelName: 'Profile',
});
