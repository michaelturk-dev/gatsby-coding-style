module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  extends: ['prettier', 'prettier/react'],
  plugins: ['react', 'prettier', 'react-hooks'],
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      version: '16.0',
      flowVersion: '0.53',
    },
    propWrapperFunctions: ['forbidExtraProps'],
  },
  rules: {
    'no-console': 'off',
    'no-inner-declarations': 'off',
    'valid-jsdoc': 'off',
    'require-jsdoc': 'off',
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'consistent-return': ['error'],
    indent: ['error', 2],
    'arrow-body-style': [
      'error',
      'as-needed',
      { requireReturnForObjectLiteral: true },
    ],
    'jsx-quotes': ['error', 'prefer-double'],
    semi: ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'react/prop-types': ['warn'],
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    'react/function-component-definition': ['error', {
      'namedComponents': 'arrow-function',
      'unnamedComponents': 'function-expression',
    }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
}
