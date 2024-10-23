"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineRulesController = void 0;
const combineRules_1 = require("../helpers/combineRules");
const astSchema_1 = __importDefault(require("../schemas/astSchema"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
exports.combineRulesController = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rules } = req.body;
    if (!rules || !Array.isArray(rules)) {
        res
            .status(400)
            .json({
            success: false,
            message: 'Rules are required and should be an array',
        });
        return;
    }
    const combinedRules = (0, combineRules_1.combineRules)(rules);
    const combinedRulesInstanceInDb = yield astSchema_1.default.create({ ast: combinedRules });
    res
        .status(200)
        .json({
        combinedRules,
        combinedRulesInstanceInDb,
        success: true,
        message: 'Rules combined successfully',
    });
}));
