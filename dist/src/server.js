"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
init();
async function init() {
    try {
        // await sequelize.sync({ force: true })
        app_1.default.listen(3001, () => {
            console.log('Express App Listening on Port 3001');
        });
    }
    catch (error) {
        console.error(`An error occurred: ${JSON.stringify(error)}`);
        process.exit(1);
    }
}
