import astSchema from '../schemas/astSchema';
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
export async function combineASTs(names: string[]): Promise<TreeNode> {
    const documents = await Promise.all(
        names.map(async name => {
            const doc = await astSchema.findOne({ name });
            if (!doc) throw new Error(`AST not found for name: ${name}`);
            return doc.ast as TreeNode;
        })
    );
    
    if (documents.length === 0) {
        throw new Error("No ASTs found in the database.");
    }

    let combinedAST = documents[0];
    for (let i = 1; i < documents.length; i++) {
        combinedAST = buildNode('AND', combinedAST, documents[i]);
    }
    
    return combinedAST;
}

export async function combineASTAndRule(names: string[], rule: string): Promise<TreeNode> {
    const documents = await Promise.all(
        names.map(async name => {
            const doc = await astSchema.findOne({ name });
            if (!doc) throw new Error(`AST not found for name: ${name}`);
            return doc.ast as TreeNode;
        })
    );

    const parsedRule = parseRule(removeSpacesAroundOperators(rule));
    let combinedAST = documents[0];
    for (let i = 1; i < documents.length; i++) {
        combinedAST = buildNode('AND', combinedAST, documents[i]);
    }
    combinedAST = buildNode('AND', combinedAST, parsedRule);

    return combinedAST;
}
