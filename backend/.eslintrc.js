module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "standard-with-typescript",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "@typescript-eslint/indent": ["error", 4],
        "@typescript-eslint/semi": ["error", "always"],
        "@typescript-eslint/space-before-function-paren": ["error", "never"],
        "@typescript-eslint/comma-dangle": ["error", "always-multiline"],
        "@typescript-eslint/quotes": ["error", "single"],
    }
}
