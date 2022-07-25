'use strict';

const lexer = require('./src/lexer');

const myLexer = new lexer();

let one = true;
let two = !one;

if (one) {
    const input_code = 'boss else ELSE Else elSe/*1*/= 200 +< 3\t\n `$abc0 = 5*3  abc';
    myLexer.input(input_code);
    console.log(input_code);
    myLexer.setLanguage('default');
    while (myLexer.hasNext()) {
        console.log(myLexer.next());
    }
}


if (two) {
    const html_code = '<!DOCTYPE html><html><head><title>Jahanzaib</title></head></html>'
    myLexer.input(html_code);
    console.log(html_code);
    myLexer.setLanguage('HTML');
    while (myLexer.hasNext()) {
        console.log(myLexer.next());
    }
}


