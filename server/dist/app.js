"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true, limit: "16kb" }));
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
app.use((0, cors_1.default)({
    origin: '*',
    credentials: true
}));
// importing routes
const allRoutes_1 = __importDefault(require("./routes/allRoutes"));
app.use("/api/v1", allRoutes_1.default);
exports.default = app;
