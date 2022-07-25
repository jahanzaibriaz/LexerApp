# Lexer App
Lexer App helps create tokens for any input based on a template defined in config/lexer_config.json

## Use

##### Code
```
const lexer = require('./src/lexer');
const myLexer = new lexer();

const myCode = `let var3 = 2 + 3;
                \\comment line
                if (var3) {
                    let var4 = "This is a string";
                }`

//myLexer.setLanguage('default');
//myLexer.includeWhitespaces = false;

myLexer.input(myCode);
while (myLexer.hasNext()) {
    console.log(myLexer.next());
}
```

##### Output
```
{ name: 'KEYWORD', value: 'let', pos: 0 }
{ name: 'IDENTIFIER', value: 'var3', pos: 4 }
{ name: 'EQUALS', value: '=', pos: 9 }
{ name: 'NUMBER', value: '2', pos: 11 }
{ name: 'PLUS', value: '+', pos: 13 }
{ name: 'NUMBER', value: '3', pos: 15 }
{ name: 'SEMI', value: ';', pos: 16 }
{ name: 'BACKSLASH', value: '\\', pos: 34 }
{ name: 'IDENTIFIER', value: 'comment', pos: 35 }
{ name: 'IDENTIFIER', value: 'line', pos: 43 }
{ name: 'KEYWORD', value: 'if', pos: 64 }
{ name: 'L_PAREN', value: '(', pos: 67 }
{ name: 'IDENTIFIER', value: 'var3', pos: 68 }
{ name: 'R_PAREN', value: ')', pos: 72 }
{ name: 'L_BRACE', value: '{', pos: 74 }
{ name: 'KEYWORD', value: 'let', pos: 96 }
{ name: 'IDENTIFIER', value: 'var4', pos: 100 }
{ name: 'EQUALS', value: '=', pos: 105 }
{ name: 'QUOTE', value: '"This is a string"', pos: 107 }
{ name: 'SEMI', value: ';', pos: 125 }
{ name: 'R_BRACE', value: '}', pos: 143 }
```

## Configuration File
lexer_config.json file can contain template for any language.
The structure of file is:
```
    {
        "lexer": {
            "default": {
                "general": {
                    "keywords_case_sensitive":  true
                },
                "reserved_op": {
                    "+": "PLUS",
                    "-": "MINUS",
                    ...
                },
                "string_op": [ "_", "$" ],
                "quotes_op": [ "\"", "'", "`" ],
                "whitespaces": [ " ", "\t", "\n", "\r" ],
                "comments_op": [
                    {
                        "opening": "\\\\",
                        "closing": "\n"
                    },
                    {
                        "opening": "/*",
                        "closing": "*/"
                    }
                ],
                "reserved_keywords": [
                    "arguments",
                    "await",
                    "break",
                    ...
                ]
            },
            "HTML": {
                "general": {
                    "keywords_case_sensitive":  false
                },
                "reserved_op": {
                    "<": "OPEN_TAG_",
                    ">": "CLOSE_TAG_",
                    ...
                },
                "string_op": [ "_", "$" ],
                "quotes_op": [ "\"", "'", "`" ],
                "whitespaces": [ " ", "\t", "\n", "\r" ],
                "comments_op": [
                    {
                        "opening": "<!--",
                        "closing": "-->"
                    },
                ],
                "reserved_keywords": [
                    "html",
                    "head",
                    "body",
                    ...
                ]
            },
        }
    }
```

lexer is the root object that contains language templates.
Each language can be defined with following properties:

- "general"
  - Set "keywords_case_sensitive" to make keywords case sensitive
- "reserved_op"
  - Define op table here for all operators
- "string_op"
  - Define if any special character be treated as normal string
- "quotes_op"
  - Define characters for start and end quotes
- "whitespaces"
  - Define list of whitespace characters
- "comments_op"
  - Define "opening" and "closing" operators for comments
- "reserved_keywords"
  - Define all reserved keywords 

