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
exports.buildAST = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const parser_1 = require("../helpers/parser");
const astSchema_1 = __importDefault(require("../schemas/astSchema"));
exports.buildAST = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ruleString, name } = req.body;
    if (!ruleString) {
        res
            .status(400)
            .json({
            success: false,
            message: 'Rule string is required ',
        });
        return;
    }
    if (!name) {
        res
            .status(400)
            .json({
            success: false,
            message: 'Name is required ',
        });
    }
    const parseResult = (0, parser_1.parseRule)(ruleString);
    const existingInstance = yield astSchema_1.default.findOne({ $or: [{ name }, { ast: parseResult }] });
    if (existingInstance) {
        res
            .status(400)
            .json({
            success: false,
            message: `Rule with same name or AST already exists, name: ${name}`,
        });
    }
    const instanceInDb = yield astSchema_1.default.create({ ast: parseResult, name });
    if (!instanceInDb) {
        res
            .status(400)
            .json({
            success: false,
            message: 'Failed to create AST instance in Database',
        });
    }
    res
        .status(200)
        .json({
        parseResult,
        instanceInDb,
        success: true,
        message: 'AST built successfully',
    });
}));
