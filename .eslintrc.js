const RULES = {
  OFF: "off",
  WARN: "warn",
  ERROR: "error",
};

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/react-in-jsx-scope": RULES.OFF,
    "react/jsx-filename-extension": RULES.OFF,
    "import/no-unresolved": RULES.OFF,
    "react/prop-types": RULES.OFF,
    "no-unused-expressions": RULES.OFF,
    "arrow-body-style": RULES.OFF,
  },
};