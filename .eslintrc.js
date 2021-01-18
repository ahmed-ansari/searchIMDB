module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  rules: {
    "useTabs": 0,
    "prettier/prettier": 0,
    "spaced-comment": ["error", "always"],
    "no-inline-comments": ["error"],
    "lines-around-comment": ["error", { "beforeBlockComment": true }],
    "lines-around-comment": ["error", { "afterBlockComment": true }]
  },
  "env": {
    "jest/globals": true
  },
  "ignorePatterns": ["test-coverage/*", "coverage/*", "src/*/*.copy.js"]
};
