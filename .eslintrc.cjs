module.exports = {
  env: {
    browser: true,
    node: true,
  },
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react/recommended",
  ],
  ignorePatterns: ["lib"],
  rules: {
    "import/order": [
      "error",
      {
        groups: ["external", "parent", ["sibling", "index"], "type"],
        "newlines-between": "always",
      },
    ],
    "@typescript-eslint/consistent-type-imports": "warn",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "variable",
        format: null,
        leadingUnderscore: "allow",
        trailingUnderscore: "allow",
      },
      {
        selector: "typeLike",
        format: ["PascalCase"],
      },
    ],
    "block-spacing": [2, "always"],
    camelcase: ["warn", { properties: "never", ignoreDestructuring: true }],
    "comma-spacing": ["error"],
    "semi-spacing": 2,
    semi: "off",
    "@typescript-eslint/semi": ["error"],
    "max-len": [
      "error",
      {
        code: 140,
        comments: 0,
        ignorePattern: `^import |//|"[^"]{100,}"`,
      },
    ],
    eqeqeq: ["error", "smart"],
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-empty": ["error", { allowEmptyCatch: true }],
    "no-irregular-whitespace": ["error", { skipStrings: false }],
    "guard-for-in": "error",
    "keyword-spacing": "error",
    "key-spacing": ["error"],
    quotes: ["error", "double", { allowTemplateLiterals: true, avoidEscape: true }],
    "object-curly-spacing": ["error", "always"],
    "eol-last": "error",
    "no-trailing-spaces": "error",
    "no-var": "error",
    "no-multiple-empty-lines": ["error", { max: 1, maxBOF: 0 }],
    "no-multi-spaces": ["error"],
    "no-whitespace-before-property": ["error"],
    "space-before-blocks": ["error", "always"],
    "space-in-parens": ["error", "never"],
    "arrow-spacing": ["error"],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/function-component-definition": "warn",
    "react/prop-types": "off",
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
    ],
  },
};