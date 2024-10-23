interface RuleNode {
    type: 'operator' | 'operand';
    value?: string;
    left?: RuleNode;
    right?: RuleNode;
}
