/* eslint-disable prettier/prettier */
module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },

    extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'prettier'],
    rules: {
        'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
        'prettier/prettier': 0,
        'linebreak-style': 0,

        // Indent with 4 spaces
        indent: ['off', 4],

        // Indent JSX with 4 spaces
        'react/jsx-indent': ['off', 4],

        // Indent props with 4 spaces
        'react/jsx-indent-props': ['off', 4],
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
    },
}
