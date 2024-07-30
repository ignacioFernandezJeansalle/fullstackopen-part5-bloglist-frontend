import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginVitestGlobals from "eslint-plugin-vitest-globals";

export default [
  { ignores: ["dist/"] },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    env: {
      "vitest-globals/env": true,
    },
  },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginVitestGlobals.configs.flat.recommended,
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": 0,
    },
  },
];
