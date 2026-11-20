import globals from "globals";
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.browser,
        pageYOffset: "readonly",
        IntersectionObserver: "readonly",
        cancelAnimationFrame: "readonly",
        requestAnimationFrame: "readonly",
        _statcounter: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
      "no-var": "off",
      "eqeqeq": "warn",
    },
  },
];