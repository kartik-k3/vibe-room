import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

export default [
  "eslint:recommended",
  {
    ignores: ["**/*.test.js"],
  },
  {
    files: ["**/*.js", "**/*.jsx"],
    rules: {
      "prefer-const": "warn",
      "no-unused-vars": "warn",
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReactConfig,
];
