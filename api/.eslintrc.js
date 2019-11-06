module.exports = {
  root: true,
  extends: [
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    sourceType: "module"
  },
  env: {
    node: true,
    browser: true,
  },
  plugins: [
    "@typescript-eslint",
  ],
  settings: {
    "import/resolver": {
      "node": {
        "extensions": [
          ".js",
          ".ts",
        ],
      }
    },
  },
  rules: {},
};
