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
    const { rules, names, mode, ruleName } = req.body;
    try {
        if (mode === 'combineASTs') {
            if (!names || !Array.isArray(names)) {
                res
                    .status(400)
                    .json({
                    success: false,
                    message: 'Names are required and should be an array',
                });
                return;
            }
            const combinedAST = yield (0, combineRules_1.combineASTs)(names);
            const combinedRulesInstanceInDb = yield astSchema_1.default.create({ ast: combinedAST, name: ruleName });
            res
                .status(200)
                .json({
                combinedRulesInstanceInDb,
                combinedAST,
                success: true,
                message: 'ASTs combined successfully',
            });
            return;
        }
        else if (mode === 'combineASTAndRule') {
            if (!names || !Array.isArray(names)) {
                res
                    .status(400)
                    .json({
                    success: false,
                    message: 'Names are required and should be an array',
                });
                return;
            }
            if (!rules || !rules.length) {
                res
                    .status(400)
                    .json({
                    success: false,
                    message: 'Rules are required and should be an array',
                });
                return;
            }
            const combinedASTAndRule = yield (0, combineRules_1.combineASTAndRule)(names, rules[0]);
            const combinedRulesInstanceInDb = yield astSchema_1.default.create({ ast: combinedASTAndRule, name: ruleName });
            res
                .status(200)
                .json({
                combinedRulesInstanceInDb,
                combinedASTAndRule,
                success: true,
                message: 'ASTs and Rule combined successfully',
            });
            return;
        }
        else if (mode === 'combineRules') {
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
            const combinedRulesInstanceInDb = yield astSchema_1.default.create({ ast: combinedRules, name: ruleName });
            res
                .status(200)
                .json({
                combinedRulesInstanceInDb,
                combinedRules,
                success: true,
                message: 'Rules combined successfully',
            });
            return;
        }
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({
            success: false,
            message: 'Something went wrong while combining rules',
        });
    }
}));
