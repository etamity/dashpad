const babel = require('@babel/core');
module.exports = (code, cwd) =>
    babel.transform(code, {
        cwd: cwd || process.cwd(),
        presets: [
            [
                require.resolve('@dashpad/babel-preset'),
                {
                    env: { targets: { node: 8 } },
                    transformRuntime: {
                        absoluteRuntime: false,
                        corejs: false,
                        helpers: true,
                        regenerator: true,
                        useESModules: false,
                    },
                },
            ],
        ],
    }).code;