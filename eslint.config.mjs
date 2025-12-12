import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node },
  },
  // Base TypeScript recommended rules, then apply project-specific relaxations below
  tseslint.configs.recommended,
  {
    files: ["**/*.{ts,mts,cts}"],
    rules: {
      // Allow unused variables/params prefixed with _ (common pattern for Playwright hooks)
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
      // Relax a few strict rules that are noisy in this repo
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
    }
  },
  {
    // Specific override for the global setup file: allow unused params entirely
    files: ["utils/globalSetup.ts"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off"
    }
  }
]);
