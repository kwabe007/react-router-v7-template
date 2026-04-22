import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import globals from "globals";
import tsEslint from "typescript-eslint";

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
        { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  // Plugin React
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],

  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: "detect", // Still good to have for rule accuracy
      },
    },
    rules: {
      // You only list what you want to CHANGE from the recommended set
      "react/jsx-no-target-blank": ["error", { allowReferrer: true }],
      "react/prop-types": "off",
    },
  },

  // Plugin JSX-A11y
  jsxA11y.flatConfigs.recommended,

  {
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

  // Plugin Import
  importPlugin.flatConfigs.recommended,

  {
    /* Make the plugin aware of the project's import aliases */
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
        node: true,
      },
    },
    rules: {
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          "newlines-between": "always",
          pathGroups: [
            {
              // Minimatch pattern used to match against specifiers
              pattern: "~/components/**",
              // The predefined group this PathGroup is defined in relation to
              group: "internal",
              // How matching imports will be positioned relative to "group"
              position: "after",
            },
          ],
        },
      ],
    },
  },

  // Other settings
  { ignores: [".react-router/**", "build/**", "playwright-report/**"] },
]);
