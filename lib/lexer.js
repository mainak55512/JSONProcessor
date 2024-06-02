/**
 * Types for the token used by the lexer.
 */
let TokenType = Object.freeze({
	NUMBER: "NUMBER",
	STRING: "STRING",
	PAREN: "PAREN",
	BINARY_OPERATOR: "BINARY_OPERATOR",
	BINARY_EXPR: "BINARY_EXPR",
	LOGICAL_EXPR: "LOGICAL_EXPR",
});


function tokenize(source_string) {
	let cursor = 0;
	let tokenArray = [];
	while (cursor < source_string.length) {
		let matchNumber = /^\d+/.exec(source_string.slice(cursor));
		let matchString = /^[a-zA-Z0-9.]+/.exec(source_string.slice(cursor));
		let matchBinaryOperator = /^(^(!=)|^(<=)|^(>=)|^(=)|^(<)|^(>)|^(\&\&)|^(\|\|)|^(\+)|^(\-))/.exec(source_string.slice(cursor));
		let matchParen = /^[\(\)]/.exec(source_string.slice(cursor));
		if (matchNumber) {
			cursor += matchNumber[0].length;
			tokenArray.push(token(TokenType.NUMBER, +matchNumber[0]));
		} else if (matchString) {
			cursor += matchString[0].length;
			tokenArray.push(token(TokenType.STRING, matchString[0]));
		} else if (matchBinaryOperator) {
			cursor += matchBinaryOperator[0].length;
			tokenArray.push(token(TokenType.BINARY_OPERATOR, matchBinaryOperator[0]));
		} else if (matchParen) {
			cursor += matchParen[0].length;
			tokenArray.push(token(TokenType.PAREN, matchParen[0]));
		}
		else {
			cursor++;
		}
	}
	return tokenArray;
}

function token(type, val) {
	return {
		type: type,
		val: val
	}
}

export { tokenize, TokenType };
