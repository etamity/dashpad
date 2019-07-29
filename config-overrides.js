const path = require('path');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = {
    webpack: (config, env) => {
        //do stuff with the webpack config...
        config.target = 'electron-renderer';
        if (process.env.ENTRY_POINT) {
            config.entry = process.env.ENTRY_POINT;
            config.resolve.plugins = config.resolve.plugins.filter(
                plugin => !(plugin instanceof ModuleScopePlugin)
            );
            config.module.rules = [
                ...config.module.rules,
                {
                    test: /\.mdx?$/,
                    use: ['babel-loader', 'mdx-loader'],
                    include: [
                        path.resolve(__dirname, 'src'),
                        path.resolve(__dirname, 'docs'),
                    ],
                },
            ];
        }

        config.module.rules[1].include = [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'docs'),
        ];
        config.node = { fs: 'empty' };
        return config;
    },
    paths: paths => {
        // console.log(paths);
        // throw Error();
        if (process.env.ENTRY_POINT) {
            paths.appSrc = path.resolve(__dirname, 'docs');
            paths.appIndexJs = path.resolve(__dirname, 'docs/index.js');
            // console.log(paths);
            // throw Error();
        }
        return {
            ...paths,
        };
    },
};
