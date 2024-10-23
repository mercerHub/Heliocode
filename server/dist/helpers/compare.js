"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function compare(ast, data) {
    // Handle undefined case
    if (ast === undefined) {
        return true;
    }
    // Handle string (expression) case
    if (typeof ast === 'string') {
        const matches = ast.match(/^([a-zA-Z_][a-zA-Z0-9_]*)([=<>])(.+)$/);
        if (!matches) {
            throw new Error(`Invalid expression format: ${ast}`);
        }
        const [_, key, operator, valueStr] = matches;
        // Check if key exists in data
        if (!(key in data)) {
            return false;
        }
        const dataValue = data[key];
        // Convert value string to appropriate type based on data value
        let value = valueStr;
        if (typeof dataValue === 'number') {
            value = Number(valueStr);
            if (isNaN(value)) {
                throw new Error(`Invalid number value in expression: ${valueStr}`);
            }
        }
        switch (operator) {
            case '=':
                return dataValue === value;
            case '<':
                return Number(dataValue) < Number(value);
            case '>':
                return Number(dataValue) > Number(value);
            default:
                throw new Error(`Unsupported operator: ${operator}`);
        }
    }
    // Handle TreeNode case
    if (ast.operator === 'operator' && ast.value) {
        switch (ast.value) {
            case 'AND':
                return compare(ast.left, data) && compare(ast.right, data);
            case 'OR':
                return compare(ast.left, data) || compare(ast.right, data);
            default:
                throw new Error(`Unknown operator: ${ast.value}`);
        }
    }
    // Handle expression node
    if (ast.operator === 'expression' && ast.value) {
        return compare(ast.value, data);
    }
    return false;
}
exports.default = compare;
