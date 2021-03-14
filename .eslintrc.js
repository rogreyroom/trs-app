module.exports = {
  extends: [
    'airbnb',
    'prettier',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      impliedStrict: true,
      classes: true,
    },
  },
  env: {
    browser: true,
    node: true,
    // "jquery": true,
    // "jest": true
  },
  settings: {
    'import/resolver': {
      alias: [
        ['@/lib', './renderer/lib'],
        ['@/components', './renderer/components'],
        ['@/contexts', './renderer/contexts'],
        ['@/icons', './renderer/components/icons/'],
        ['@/layouts', './renderer/components/layouts'],
        ['@/common', './renderer/components/common'],
        ['@/dashboard', './renderer/components/TheDashboard'],
        ['@/subPages', './renderer/components/TheDashboard/SubPages'],
      ],
    },
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'no-debugger': 0,
    'no-alert': 0,
    'no-unused-vars': [
      'error',
      {
        args: 'none',
        ignoreRestSiblings: true,
      },
    ], // default 1
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
      },
    ],
    'arrow-body-style': [2, 'as-needed'],
    'no-unused-expressions': [
      2,
      {
        // allowTaggedTemplates: true,
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
    'no-param-reassign': [
      2,
      {
        props: false,
      },
    ],
    'no-console': 0,
    'import/prefer-default-export': 0, // default 1
    import: 0,
    'func-names': 0,
    'space-before-function-paren': 0,
    'comma-dangle': 0,
    'max-len': 0,
    'import/extensions': 0,
    'no-underscore-dangle': 0,
    'consistent-return': 0,
    'react/display-name': 0, // default 1
    'react/no-array-index-key': 0,
    'react/react-in-jsx-scope': 0,
    'react/prefer-stateless-function': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'react/no-unescaped-entities': 0,
    'jsx-a11y/accessible-emoji': 0,
    'react/require-default-props': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    radix: 0,
    'no-shadow': 'off',
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 100,
      },
    ],
    'jsx-a11y/href-no-hash': 'off',
    'jsx-a11y/anchor-is-valid': [
      'warn',
      {
        aspects: ['invalidHref'],
      },
    ],
    // NEW rules
    camelcase: 0,
    'react/prop-types': 0,
    'react/jsx-uses-vars': 1,
    'react/jsx-uses-react': 1,
    'no-restricted-properties': [
      2,
      {
        object: 'disallowedObjectName',
        property: 'disallowedPropertyName',
      },
    ],
    'array-callback-return': ['error', {allowImplicit: true}],
  },
  plugins: ['prettier', 'react', 'react-hooks'],
};
