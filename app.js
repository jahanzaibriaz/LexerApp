'use strict';

const lexer = require('./src/lexer');
const myLexer = new lexer();
module.exports = myLexer;

/*
const myCode = `let var1 = 2;
                let var2 = 3;
                let var3 = 2 + 3;
                \\comment line
                if (var3) {
                    let var4 = "This is a string";
                }`
myLexer.input(myCode);
while (myLexer.hasNext()) {
    console.log(myLexer.next());
}

OUTPUT
-------------------------------------------------------
{ name: 'KEYWORD', value: 'let', pos: 0 }
{ name: 'IDENTIFIER', value: 'var1', pos: 4 }
{ name: 'EQUALS', value: '=', pos: 9 }
{ name: 'NUMBER', value: '2', pos: 11 }
{ name: 'SEMI', value: ';', pos: 12 }
{ name: 'KEYWORD', value: 'let', pos: 30 }
{ name: 'IDENTIFIER', value: 'var2', pos: 34 }
{ name: 'EQUALS', value: '=', pos: 39 }
{ name: 'NUMBER', value: '3', pos: 41 }
{ name: 'SEMI', value: ';', pos: 42 }
{ name: 'KEYWORD', value: 'let', pos: 60 }
{ name: 'IDENTIFIER', value: 'var3', pos: 64 }
{ name: 'EQUALS', value: '=', pos: 69 }
{ name: 'NUMBER', value: '2', pos: 71 }
{ name: 'PLUS', value: '+', pos: 73 }
{ name: 'NUMBER', value: '3', pos: 75 }
{ name: 'SEMI', value: ';', pos: 76 }
{ name: 'BACKSLASH', value: '\\', pos: 94 }
{ name: 'IDENTIFIER', value: 'comment', pos: 95 }
{ name: 'IDENTIFIER', value: 'line', pos: 103 }
{ name: 'KEYWORD', value: 'if', pos: 124 }
{ name: 'L_PAREN', value: '(', pos: 127 }
{ name: 'IDENTIFIER', value: 'var3', pos: 128 }
{ name: 'R_PAREN', value: ')', pos: 132 }
{ name: 'L_BRACE', value: '{', pos: 134 }
{ name: 'KEYWORD', value: 'let', pos: 156 }
{ name: 'IDENTIFIER', value: 'var4', pos: 160 }
{ name: 'EQUALS', value: '=', pos: 165 }
{ name: 'QUOTE', value: '"This is a string"', pos: 167 }
{ name: 'SEMI', value: ';', pos: 185 }
{ name: 'R_BRACE', value: '}', pos: 203 }
*/
