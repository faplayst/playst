module.exports = {
  extends: ['eslint-config-airbnb/legacy'].map(require.resolve),
  rules: {
    // babel inserts `'use strict';` for us
    strict: [
      'error',
      'global',
    ],

    parserOptions: {
      ecmaVersion: 5,
      sourceType: 'script'
    },

    ecmaFeatures: {
      defaultParams: true,
      restParams: true,
    },

    // require all requires be top-level
    // https://eslint.org/docs/rules/global-require
    'global-require': 'error',

    'no-var': 'error',
  },
};
