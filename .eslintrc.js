/* eslint-disable quotes */
module.exports = {
    "env": {
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "semi": 2,
        "camelcase": 1,
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-var-requires": "off",
        "no-empty": "off",
        "@typescript-eslint/no-this-alias": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "no-useless-escape": 0,
        "@typescript-eslint/ban-types": "off",
        "no-case-declarations": "off",
        "prefer-const": "off",
        "quotes": [2,"single",
            {
              "allowTemplateLiterals": true
            },
        ],
        "@typescript-eslint/no-unused-vars": 0,
        
    }
};
