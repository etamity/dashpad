const { join } = require('path');
const { existsSync } = require('fs');
const cwd = process.cwd();

let absSrcPath = join(cwd, 'src');
if (!existsSync(absSrcPath)) {
    absSrcPath = cwd;
}

module.exports = api => {
    // see docs about api at https://babeljs.io/docs/en/config-files#apicache
    api && api.cache(true);
    return {
        presets: [
            [
                require.resolve('@dashpad/babel-preset'),
                {
                    env: { targets: { node: 8 } },
                    transformRuntime: false,
                },
            ],
        ],
        plugins: [
            [
                require.resolve('babel-plugin-module-resolver'),
                {
                    alias: {
                        '@': absSrcPath,
                    },
                },
            ],
        ]
    };
};
