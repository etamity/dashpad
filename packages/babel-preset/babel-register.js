module.exports = (opts = {}) => {
    const { only, ignore, cwd, transformRuntime } = opts;
    require('@babel/register')({
        cwd: cwd || process.cwd(),
        ignore: ignore || [/node_modules\/(?!(@c1.*))/],
        presets: [
            [
                require.resolve('@dashpad/babel-preset'),
                {
                    env: { targets: { node: 8 } },
                    transformRuntime,
                },
            ],
        ],
        only,
        extensions: ['.es6', '.es', '.jsx', '.js', '.mjs'],
        babelrc: false,
        cache: false,
    });
    require('@babel/polyfill');
};
