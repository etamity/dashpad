const path = require('path');

require('@babel/register')({
    cwd: path.resolve(__dirname, '../../node_modules'),
    ignore: [/node_modules\/(?!(@c1.*))/],
    presets: [
        [
            require.resolve('@dashpad/babel-preset'),
            {
                env: { targets: { node: 8 } },
                transformRuntime: false,
            },
        ],
    ],
});
require('@babel/polyfill');
require(path.resolve(__dirname + '/module_loader.js'));
