import { TreeNode} from './classes';
import { buildNode, parseRule } from './parser';

function removeSpacesAroundOperators(input: string): string {
    return input.replace(/\s*(=|<|>)\s*/g, '$1');
}

export function combineRules(rules: string[]): TreeNode {
    const parsedRules: TreeNode[] = rules.map(rule => parseRule(removeSpacesAroundOperators(rule)));
    let combinedAST = parsedRules[0];

    for (let i = 1; i < parsedRules.length; i++) {
        combinedAST = buildNode('AND', combinedAST, parsedRules[i]);
    }

    return combinedAST;
}
