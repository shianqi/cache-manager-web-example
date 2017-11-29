module.exports = {
  extends: "standard",
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true
  },
  plugins: [
    'react'
  ],
  rules: {
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2
  }
};
