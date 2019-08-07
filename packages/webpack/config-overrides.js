require('util').inspect.defaultOptions.depth = null;
const path = require('path');
const images = require('remark-images');
const emoji = require('remark-emoji');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = {
    webpack: (config, env) => {
        config.target = 'electron-renderer';
        if (process.env.APP_TYPE === 'docs') {
            const mockModules = require('@dashpad/core/resolve');
            config.target = undefined;
            config.resolve.plugins = config.resolve.plugins.filter(
                plugin => !(plugin instanceof ModuleScopePlugin)
            );

            config.resolve.alias = { 
                ...config.resolve.alias, 
                ...mockModules };
            config.node = { fs: 'empty' };
        }
        const docsBasePath = path.resolve(__dirname, '../frontend/documents');
        const dashpadBasePath = path.resolve(__dirname, '../frontend/dashpad');

        config.resolve.modules = [...config.resolve.modules, dashpadBasePath];
        config.module.rules = config.module.rules.map(rule => {
            if (rule.oneOf instanceof Array) {
                if (process.env.APP_TYPE === 'docs') {

                    rule.oneOf = rule.oneOf.map(oneOfRule => {
                        if (
                            String(oneOfRule.test) ===
                            String('/\\.(js|mjs|jsx|ts|tsx)$/')
                        ) {
                            oneOfRule.include = [
                                docsBasePath,
                                dashpadBasePath,
                            ];
                        }
                        return oneOfRule;
                    });
                }
                return {
                    ...rule,
                    // create-react-app let every file which doesn't match to any filename test falls back to file-loader,
                    // so we need to add purs-loader before that fallback.
                    // see: https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/config/webpack.config.dev.js#L220-L236
                    oneOf: [
                        {
                            test: /\.mdx?$/,
                            use: [
                                'babel-loader',
                                {
                                    loader: '@mdx-js/loader',
                                    options: {
                                        remarkPlugins: [images, emoji],
                                    },
                                },
                            ],
                            include: [path.resolve(__dirname, '../frontend')],
                        },
                        ...rule.oneOf,
                    ],
                };
            }

            return rule;
        });
        // console.log(config);
        // throw new Error();
        return config;
    },
    paths: paths => {
        let basePath;
        if (process.env.APP_TYPE === 'docs') {
            basePath = '../frontend/documents';
        } else {
            basePath = '../frontend/dashpad';
        }
        process.env.SKIP_PREFLIGHT_CHECK = true;
        paths.appIndexJs = path.resolve(__dirname, basePath, 'index.js');
        paths.appBuild = path.resolve(__dirname, '../../' ,process.env.APP_TYPE || 'build');
        paths.appPublic = path.resolve(__dirname, '../../', 'public');
        paths.appHtml = path.resolve(__dirname, '../../', 'public/index.html');
        paths.appSrc = path.resolve(__dirname, basePath);
        return {
            ...paths,
        };
    },
};
