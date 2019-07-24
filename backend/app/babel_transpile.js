const path = require('path');
console.log('__dirname:', __dirname);
module.paths.push(path.resolve(__dirname, '../../node_modules'));

require('babel-core').transform('code', {
    cwd: path.resolve(__dirname, '../../node_modules'),
    plugins: ['dynamic-import-node'],
});
require('@babel/register')({
    cwd: path.resolve(__dirname, '../../node_modules'),
    babelrcRoots: [
        // Keep the root as a root
        '.',

        // Also consider monorepo packages "root" and load their .babelrc files.
        './packages/*'
    ],
	ignore: [/node_modules\/(?!(@c1.*))/],
    presets: [
        [
            '@babel/preset-env',
            {
                targets: { electron: require('electron/package.json').version },
            },
        ],
    ],
    plugins: [
        // Stage 0
        '@babel/plugin-proposal-function-bind',

        // Stage 1
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-proposal-logical-assignment-operators',
        ['@babel/plugin-proposal-optional-chaining', { loose: false }],
        ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
        [
            '@babel/plugin-proposal-nullish-coalescing-operator',
            { loose: false },
        ],
        '@babel/plugin-proposal-do-expressions',

        // Stage 2
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        '@babel/plugin-proposal-function-sent',
        '@babel/plugin-proposal-export-namespace-from',
        '@babel/plugin-proposal-numeric-separator',
        '@babel/plugin-proposal-throw-expressions',

        // Stage 3
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-syntax-import-meta',
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        '@babel/plugin-proposal-json-strings',
    ],
});
require('@babel/polyfill');
require(path.resolve(__dirname + '/module_loader.js'));
