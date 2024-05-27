/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@nfid/eslint-config/library.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["jest"],
  env: {
    jest: true,
  },
};
