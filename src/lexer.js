'use strict';

const helper = require('./lexer_helper');

function Lexer() {
    this.pos = 0;                           //current position in input buffer
    this.buf = null;                        //input buffer
    this.buflen = 0;                        //length of input buffer
    this.includeWhitespaces = false;        //whether to include whitespaces as token or not
    this.language = 'default';
    this.setLanguage(this.language);             
}

Lexer.prototype.input = function (buf) {    //set input buffer
    this.pos = 0;
    this.buf = buf;
    this.buflen = buf.length;
}

Lexer.prototype.setLanguage = function (lang) {
    if (helper.setLanguage(lang)) {
        this.language = lang;
    } else {
        throw Error('Invalid language specified.');
    }
}

Lexer.prototype.hasNext = function () {     //check if there are more tokens to read
    return (this.pos < this.buflen);
}

Lexer.prototype.next = function () {        //read next token
    if (this.pos >= this.buflen) {
        return null;
    }

    let c = this.buf.charAt(this.pos);

    if (helper.isWhitespace(c)) {
        if (this.includeWhitespaces) {
            return this._processWhitespace();
        }
        this._processWhitespace();
        c = this.buf.charAt(this.pos);
    }

    if (helper.isCommentStart(c)) {
        let result = this._processComment();
        if (result['success']) {
            return result['result'];
        }
    }

    if (helper.isOperator(c)) {
        return helper.createToken(helper.operatorName(c), c, this.pos++);
    } else {
        if (helper.isAlpha(c)) {
            return this._processIdentifier();
        } else if (helper.isDigit(c)) {
            return this._processNumber();
        } else if (helper.isQuote(c)) {
            return this._processQuote();
        } else {
            throw Error('Token error at ' + this.pos + 'with token being ' + c);
        }
    }
    this.pos++;
}

Lexer.prototype._processWhitespace = function () {
    let beginpos = this.pos;
    let endpos = this.pos;
    while (endpos < this.buflen && helper.isWhitespace(this.buf.charAt(endpos))) {
        endpos++;
    }

    this.pos = endpos;
    return helper.createToken('WHITESPACE', this.buf.substring(beginpos, endpos), beginpos);
}

Lexer.prototype._processComment = function () {
    let tillEndOfLine = this.buf.slice(this.pos, this.buf.indexOf('\n', this.pos + 1));

    for (const comment_op of helper.getCommentsOp()) {
        let openingOp = comment_op['opening'];
        let closingOp = comment_op['closing'];
        let comment = '';

        if (tillEndOfLine.startsWith(openingOp)) {
            let beginpos = this.pos
            let endpos = this.buf.indexOf(closingOp, beginpos + openingOp.length);

            if (endpos == -1) {
                endpos = this.buflen;
                comment = this.buf.substring(beginpos, endpos + 1) + closingOp;
            } else {
                comment = this.buf.substring(beginpos, endpos + closingOp.length);
            }

            this.pos = endpos + closingOp.length;
            return { success: true, result: helper.createToken('COMMENT', comment, beginpos) };
        }
    }
    return { success: false, result: null};
}

Lexer.prototype._processIdentifier = function () {
    let beginpos = this.pos;
    let endpos = this.pos + 1;
    while (endpos < this.buflen && helper.isAlphaNumeric(this.buf.charAt(endpos))) {
        endpos++;
    }

    let identifier = this.buf.substring(beginpos, endpos);
    this.pos = endpos;

    if (helper.isKeyword(identifier)) {
        return helper.createToken('KEYWORD', identifier, beginpos);
    } else {
        return helper.createToken('IDENTIFIER', identifier, beginpos);
    }
}

Lexer.prototype._processNumber = function () {
    let beginpos = this.pos;
    let endpos = this.pos + 1;
    while (endpos < this.buflen && helper.isDigit(this.buf.charAt(endpos))) {
        endpos++;
    }

    this.pos = endpos;
    return helper.createToken('NUMBER', this.buf.substring(beginpos, endpos), beginpos);
}

Lexer.prototype._processQuote = function () {
    let quoteChar = this.buf.charAt(this.pos);
    let needClosingQuote = false;

    let beginpos = this.pos;
    let endpos = this.buf.indexOf(quoteChar, this.pos + 1);
    if (endpos == -1) {
        endpos = this.buflen;
        needClosingQuote = true;
    }  

    let quote = this.buf.substring(beginpos, endpos + 1);
    quote += needClosingQuote ? quoteChar : '';

    this.pos = endpos + 1;
    return helper.createToken('QUOTE', quote, beginpos);
}

module.exports = Lexer;