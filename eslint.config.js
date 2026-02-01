import js from "@eslint/js";
import globals from "globals";
import tsEslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Plugin Javascript
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      "no-empty-pattern": "warn",
    },
  },

  // Plugin Typescript
  ...tsEslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { varsIgnorePattern: "^_" },
      ],
    },
  },

  // Plugin React
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-no-target-blank": ["error", { allowReferrer: true }],
    },
  },

  // Plugin JSX-A11y
  {
    ...jsxA11y.flatConfigs.recommended,
    settings: {
      "jsx-a11y": {
        components: {
          LazyImage: "img",
          LazyVideo: "video",
          StandardInput: "input",
          ValidatedInput: "input",
        },
      },
    },
    rules: {
      "jsx-a11y/autocomplete-valid": [
        "error",
        {
          inputComponents: ["StandardInput", "ValidatedInput"],
        },
      ],
    },
  },

  // Other settings
  { ignores: [".react-router/**", "build/**", "playwright-report/**"] },
]);
