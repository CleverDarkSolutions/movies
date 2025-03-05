import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tseslintParser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";

export default [
  pluginJs.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json"
      }
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "react": pluginReact
    },
    rules: {
      "indent": ["error", 2, { "SwitchCase": 1 }],
      "semi": ["error", "always"],
      "quotes": ["error", "single", { "avoidEscape": true }],
      "linebreak-style": ["error", "unix"],
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "keyword-spacing": ["error", { "before": true, "after": true }],
      "space-infix-ops": "error",
      "camelcase": "error",
      "comma-dangle": ["error", "always-multiline"],
      "arrow-parens": ["error", "always"],
      "prefer-const": "error",
      "no-extra-semi": "error",
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "no-console": ["warn", { "allow": ["warn", "error"] }],
      "newline-before-return": "error",
      "max-len": ["warn", { "code": 100 }],
      "no-multiple-empty-lines": ["error", { "max": 1 }],
      "react/jsx-props-no-spreading": "off",
      "react/jsx-key": "warn",
      "react/function-component-definition": ["error", { "namedComponents": "arrow-function" }],
      "react/require-default-props": "off",
      "react/jsx-filename-extension": ["error", { "extensions": [".tsx"] }],
      "react/react-in-jsx-scope": "off",
      "react/self-closing-comp": "error",
    }
  }
];
