import { TokenType } from './lexer.js';

export function parse_ast(token_array) {
	let left = parse_binary_expr(token_array);
	while (token_array.length > 0 && (token_array[0].val == '&&' || token_array[0].val == '||')) {
		const operator = token_array.shift().val;
		const right = parse_binary_expr(token_array);
		left = {
			kind: TokenType.LOGICAL_EXPR,
			left,
			right,
			operator,
		}
	}
	return left;
}

function parse_binary_expr(token_array) {
	let left = parse_primary_expr(token_array);
	while (token_array.length > 0 && (token_array[0].val == '=' || token_array[0].val == '>=' || token_array[0].val == '<=' || token_array[0].val == '>' || token_array[0].val == '<' || token_array[0].val == '!=')) {
		const operator = token_array.shift().val;
		const right = parse_primary_expr(token_array);
		left = {
			kind: TokenType.BINARY_EXPR,
			left,
			right,
			operator,
		}
	}
	return left;
}

function parse_primary_expr(token_array) {
	const tk = token_array[0].type;

	switch (tk) {
		case TokenType.NUMBER:
			return { kind: "NUMERIC_LITERAL", symbol: token_array.shift().val };
		case TokenType.STRING:
			return { kind: "STRING_LITERAL", symbol: token_array.shift().val };
		case TokenType.BINARY_OPERATOR:
			return { kind: "BINARY_OPERATOR", symbol: token_array.shift().val };
		case TokenType.PAREN:
			token_array.shift();
			const value = parse_ast(token_array);
			token_array.shift();
			return value;
		default:
			console.error("Unexpecter error");
	}
}

