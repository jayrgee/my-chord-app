module.exports = {
    "env": {
        "browser": true,
        "jquery": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "indent": ["error", 2],
        "max-len": [1, 180, 2, { ignoreComments: true }]
  }
};