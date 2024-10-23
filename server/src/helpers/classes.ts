
export class TreeNode{
    operator:'operator' | 'expression' = 'operator';
    value?: string = undefined;
    left?: TreeNode | string = undefined;
    right?: TreeNode | string = undefined;
    constructor(operator:'operator' | 'expression',value?:string, left?: TreeNode | string, right?: TreeNode | string){
        this.operator = operator;
        this.value = value;
        this.left = left;
        this.right = right;
    }
} 
