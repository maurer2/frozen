module.exports = {
  extends: [
    "plugin:react/recommended",
    "airbnb",
  ],
  parser: "babel-eslint",
  env: {
    node: true,
  },
  rules: {},
  parserOptions: {
    "ecmaFeatures": {
      "jsx": true
    },
  },
  plugins: [
    "react",
  ],
  settings: {},
};