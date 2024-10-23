"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findClosingParenthesis = findClosingParenthesis;
exports.buildNode = buildNode;
exports.parseTokens = parseTokens;
exports.parseRule = parseRule;
const classes_1 = require("./classes");
function tokenize(rule) {
    const normalized = rule
        .replace(/\(/g, ' ( ')
        .replace(/\)/g, ' ) ');
    return normalized.split(/\s+/).filter(token => token.length > 0);
}
function removeSpacesAroundOperators(input) {
    return input.replace(/\s*(=|<|>)\s*/g, '$1');
}
function findClosingParenthesis(tokens, startIndex) {
    let count = 1;
    for (let i = startIndex + 1; i < tokens.length; i++) {
        if (tokens[i] === '(')
            count++;
        if (tokens[i] === ')')
            count--;
        if (count === 0)
            return i;
    }
    throw new Error('Mismatched parentheses');
}
function buildNode(operator, left, right) {
    const leftNode = typeof left === 'string' ? new classes_1.TreeNode('expression', left) : left;
    const rightNode = typeof right === 'string' ? new classes_1.TreeNode('expression', right) : right;
    return new classes_1.TreeNode('operator', operator, leftNode, rightNode);
}
function parseTokens(tokens, start = 0, end = tokens.length) {
    if (end - start === 1) {
        return new classes_1.TreeNode('expression', tokens[start]);
    }
    let processedTokens = [];
    for (let i = start; i < end; i++) {
        if (tokens[i] === '(') {
            const closeIndex = findClosingParenthesis(tokens, i);
            processedTokens.push(parseTokens(tokens, i + 1, closeIndex));
            i = closeIndex;
        }
        else if (tokens[i] !== ')') {
            processedTokens.push(tokens[i]);
        }
    }
    let andTokens = [processedTokens[0]];
    for (let i = 1; i < processedTokens.length; i += 2) {
        const operator = processedTokens[i];
        const nextToken = processedTokens[i + 1];
        if (operator === 'AND') {
            const lastToken = andTokens[andTokens.length - 1];
            andTokens[andTokens.length - 1] = buildNode('AND', lastToken, nextToken);
        }
        else { // OR
            andTokens.push('OR', nextToken);
        }
    }
    let result = andTokens[0];
    for (let i = 1; i < andTokens.length; i += 2) {
        result = buildNode('OR', result, andTokens[i + 1]);
    }
    return typeof result === 'string' ? new classes_1.TreeNode('expression', result) : result;
}
function parseRule(rule) {
    const tokens = tokenize(removeSpacesAroundOperators(rule));
    return parseTokens(tokens);
}
// Replace placeholders (A, B, C) with actual expressions
