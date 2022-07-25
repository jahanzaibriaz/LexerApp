'use strict';

const fs = require('fs');
const rawdata = fs.readFileSync('./config/lexer_config.json');
const config = JSON.parse(rawdata);

let language_param = {
    general: {}, reserved_op: {}, string_op: [], quotes_op: [],
    whitespaces: [], comments_op: [], comments_op_start: [], keywords: [], 
}

exports.setLanguage = function setLanguage(lang) {
    if (Object.keys(config.lexer).includes(lang)) {
        const language = config.lexer[lang];
        language_param = {
            general: language.general,
            reserved_op: language.reserved_op,
            string_op: language.string_op,
            quotes_op: language.quotes_op,
            whitespaces: language.whitespaces,
            comments_op: language.comments_op,
            comments_op_start: getCommentsOpStart(language.comments_op),
            keywords: language.reserved_keywords
        };
        return true;
    }
    return false;
}

exports.isCommentStart = function isCommentStart(c) {
    return language_param.comments_op_start.includes(c);
}

exports.isOperator = function isOperator(c) {
    return (language_param.reserved_op[c] !== undefined);
}

exports.operatorName = function operatorName(c) {
    return language_param.reserved_op[c];
}

exports.isAlpha = function isAlpha(c) {
    return (c >= 'a' && c <= 'z') ||
        (c >= 'A' && c <= 'Z') ||
        (language_param.string_op.includes(c));
}

exports.isDigit = function isDigit(c) {
    return (c >= '0' && c <= '9');
}

exports.isAlphaNumeric = function isAlphaNumeric(c) {
    return (this.isAlpha(c) || this.isDigit(c));
}

exports.isQuote = function isQuote(c) {
    return language_param.quotes_op.includes(c);
}

exports.isKeyword = function isKeyword(w) {
    if (language_param.general.keywords_case_sensitive) {
        return language_param.keywords.includes(w);
    } else {
        const uppercasedKeywords = language_param.keywords.map(keyword => keyword.toUpperCase());
        return uppercasedKeywords.includes(w.toUpperCase());
    }
}

exports.isWhitespace = function isWhitespace(c) {
    return language_param.whitespaces.includes(c);
}

exports.createToken = function createToken(name, value, pos) {
    return { name, value, pos };
}


exports.getCommentsOp = function getCommentsOp() {
    return language_param.comments_op;
}

//comments operators can have more than one letter
//extract first letter for each comment operator
//so that we can compare and see if token is start of a comment
function getCommentsOpStart(comments_op) {
    const comments_op_start = new Set();
    comments_op.forEach((a) => comments_op_start.add(a['opening'].charAt(0)));
    return [...comments_op_start];
}