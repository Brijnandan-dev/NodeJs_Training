module.exports = [
  {
    ignores: ['node_modules'],
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-console': ['error', { 'allow': ['warn', 'error'] }],     // not Allow console statements  //this will allow coonsoles with eslint comment
      'indent': ['error', 2],            // Enforce 2-space indentation
      'quotes': ['error', 'single'],     // Enforce single quotes
      'semi': ['error', 'always'],       // Enforce semicolons
      'eqeqeq': ['error', 'always'],     // Enforce strict equality (===)
      'no-unused-vars': ['warn'],        // Warn on unused variables
      'arrow-spacing': ['error', { 'before': true, 'after': true }], // Enforce spacing around arrow functions
      'no-warning-comments': ['warn', { 'terms': ['todo', 'fixme'], 'location': 'anywhere' }] //this will allow coonsoles with eslint comment
    },
  },
];
