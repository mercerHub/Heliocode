import { TreeNode } from './classes';

function tokenize(rule: string): string[] {
    const normalized = rule
        .replace(/\(/g, ' ( ')
        .replace(/\)/g, ' ) ');
    return normalized.split(/\s+/).filter(token => token.length > 0);
}
function removeSpacesAroundOperators(input: string): string {
    return input.replace(/\s*(=|<|>)\s*/g, '$1');
}

export function findClosingParenthesis(tokens: string[], startIndex: number): number {
    let count = 1;
    for (let i = startIndex + 1; i < tokens.length; i++) {
        if (tokens[i] === '(') count++;
        if (tokens[i] === ')') count--;
        if (count === 0) return i;
    }
    throw new Error('Mismatched parentheses');
}

export function buildNode(operator: string, left: TreeNode | string, right: TreeNode | string): TreeNode {
    const leftNode = typeof left === 'string' ? new TreeNode('expression', left) : left;
    const rightNode = typeof right === 'string' ? new TreeNode('expression', right) : right;
    return new TreeNode('operator', operator, leftNode, rightNode);
}

export function parseTokens(tokens: string[], start: number = 0, end: number = tokens.length): TreeNode {
    if (end - start === 1) {
        return new TreeNode('expression', tokens[start]);
    }

    let processedTokens: (string | TreeNode)[] = [];
    for (let i = start; i < end; i++) {
        if (tokens[i] === '(') {
            const closeIndex = findClosingParenthesis(tokens, i);
            processedTokens.push(parseTokens(tokens, i + 1, closeIndex));
            i = closeIndex;
        } else if (tokens[i] !== ')') {
            processedTokens.push(tokens[i]);
        }
    }

    let andTokens: (string | TreeNode)[] = [processedTokens[0]];
    for (let i = 1; i < processedTokens.length; i += 2) {
        const operator = processedTokens[i];
        const nextToken = processedTokens[i + 1];

        if (operator === 'AND') {
            const lastToken = andTokens[andTokens.length - 1];
            andTokens[andTokens.length - 1] = buildNode('AND', lastToken, nextToken);
        } else { // OR
            andTokens.push('OR', nextToken);
        }
    }

    let result = andTokens[0];
    for (let i = 1; i < andTokens.length; i += 2) {
        result = buildNode('OR', result, andTokens[i + 1]);
    }

    return typeof result === 'string' ? new TreeNode('expression', result) : result;
}

export function parseRule(rule: string): TreeNode {
    const tokens = tokenize(removeSpacesAroundOperators(rule));
    return parseTokens(tokens);
}

// Replace placeholders (A, B, C) with actual expressions

