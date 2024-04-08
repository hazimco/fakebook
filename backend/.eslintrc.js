module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  overrides: [
    {
      files: ["tests/**/*"],
      env: {
        jest: true,
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    eqeqeq: "error",
  },
};
