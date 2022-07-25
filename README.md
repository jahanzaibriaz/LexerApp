# Lexer App
Lexer App helps create tokens for any input based on a template defined in config/lexer_config.json

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

