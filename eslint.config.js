import js from "@eslint/js";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tailwind from "eslint-plugin-tailwindcss";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactPlugin.configs.flat["jsx-runtime"].rules,
      ...reactHooks.configs.flat.recommended.rules,
      "react/prop-types": "off",
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/purity": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
    settings: {
      react: { version: "detect" },
    },
  },
  ...tailwind.configs["flat/recommended"].map((entry) => ({
    ...entry,
    rules: {
      ...entry.rules,
      "tailwindcss/classnames-order": "off",
      "tailwindcss/enforces-shorthand": "off",
      "tailwindcss/no-custom-classname": "off",
    },
  })),
  {
    files: ["**/*.config.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    ignores: ["dist"],
  },
];
