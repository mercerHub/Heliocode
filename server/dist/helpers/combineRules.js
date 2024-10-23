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
exports.combineRules = combineRules;
exports.combineASTs = combineASTs;
exports.combineASTAndRule = combineASTAndRule;
const astSchema_1 = __importDefault(require("../schemas/astSchema"));
const parser_1 = require("./parser");
function removeSpacesAroundOperators(input) {
    return input.replace(/\s*(=|<|>)\s*/g, '$1');
}
function combineRules(rules) {
    const parsedRules = rules.map(rule => (0, parser_1.parseRule)(removeSpacesAroundOperators(rule)));
    let combinedAST = parsedRules[0];
    for (let i = 1; i < parsedRules.length; i++) {
        combinedAST = (0, parser_1.buildNode)('AND', combinedAST, parsedRules[i]);
    }
    return combinedAST;
}
function combineASTs(names) {
    return __awaiter(this, void 0, void 0, function* () {
        const documents = yield Promise.all(names.map((name) => __awaiter(this, void 0, void 0, function* () {
            const doc = yield astSchema_1.default.findOne({ name });
            if (!doc)
                throw new Error(`AST not found for name: ${name}`);
            return doc.ast;
        })));
        if (documents.length === 0) {
            throw new Error("No ASTs found in the database.");
        }
        let combinedAST = documents[0];
        for (let i = 1; i < documents.length; i++) {
            combinedAST = (0, parser_1.buildNode)('AND', combinedAST, documents[i]);
        }
        return combinedAST;
    });
}
function combineASTAndRule(names, rule) {
    return __awaiter(this, void 0, void 0, function* () {
        const documents = yield Promise.all(names.map((name) => __awaiter(this, void 0, void 0, function* () {
            const doc = yield astSchema_1.default.findOne({ name });
            if (!doc)
                throw new Error(`AST not found for name: ${name}`);
            return doc.ast;
        })));
        const parsedRule = (0, parser_1.parseRule)(removeSpacesAroundOperators(rule));
        let combinedAST = documents[0];
        for (let i = 1; i < documents.length; i++) {
            combinedAST = (0, parser_1.buildNode)('AND', combinedAST, documents[i]);
        }
        combinedAST = (0, parser_1.buildNode)('AND', combinedAST, parsedRule);
        return combinedAST;
    });
}
