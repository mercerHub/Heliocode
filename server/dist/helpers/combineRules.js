"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineRules = combineRules;
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
