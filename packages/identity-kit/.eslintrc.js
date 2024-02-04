/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@nfid/eslint-config/library.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.lint.json",
  },
  plugins: ["jest"],
  env: {
    jest: true,
    browser: true,
  },
}
