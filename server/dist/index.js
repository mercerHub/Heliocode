"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnect_1 = require("./db/dbConnect");
const app_1 = __importDefault(require("./app"));
(0, dbConnect_1.dbConnect)().then(() => {
    app_1.default.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});
