import { tokenize } from "./lexer.js";
import { parse_ast } from "./parser.js";

export default function eval_query(obj, query_string) {
	let tokens = tokenize(query_string);
	let ast = parse_ast(tokens);

	return __evaluate(obj, ast);
}

function __evaluate(obj, ast) {
	return eval_ast_stmt(obj, ast);
}

function eval_ast_stmt(obj, ast_stmt) {
	switch (ast_stmt.kind) {
		case "LOGICAL_EXPR":
			return eval_logical_expr(obj, ast_stmt);
		case "BINARY_EXPR":
			return eval_binary_expr(obj, ast_stmt);
		case "STRING_LITERAL":
			return ast_stmt;
		case "NUMERIC_LITERAL":
			return ast_stmt;
	}
}

function eval_logical_expr(obj, ast) {
	let lhs = eval_ast_stmt(obj, ast.left);
	let rhs = eval_ast_stmt(obj, ast.right);
	return _eval_logical_expr(lhs, rhs, ast.operator);
}


function eval_binary_expr(obj, ast) {
	let lhs = eval_ast_stmt(obj, ast.left);
	let rhs = eval_ast_stmt(obj, ast.right);
	return _eval_binary_expr(lhs, rhs, ast.operator, obj);
}


function _eval_logical_expr(lhs, rhs, opr) {
	switch (opr) {
		case "&&":
			return (lhs && rhs);
		case "||":
			return (lhs || rhs);
	}
}

function _eval_binary_expr(lhs, rhs, opr, obj) {
	switch (opr) {
		case "=":
			return (obj[lhs["symbol"]] == rhs["symbol"]);
		case ">":
			return (obj[lhs["symbol"]] > rhs["symbol"]);
		case "<":
			return (obj[lhs["symbol"]] < rhs["symbol"]);
		case ">=":
			return (obj[lhs["symbol"]] >= rhs["symbol"]);
		case "<=":
			return (obj[lhs["symbol"]] <= rhs["symbol"]);
		case "!=":
			return (obj[lhs["symbol"]] != rhs["symbol"]);
	}
}

