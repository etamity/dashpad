require('util').inspect.defaultOptions.depth = null;
const path = require('path');
const images = require('remark-images');
const emoji = require('remark-emoji');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const docsBasePath = path.resolve(__dirname, '../frontend/documents');
const dashpadBasePath = path.resolve(__dirname, '../frontend/dashpad');
const frontendPath = path.resolve(__dirname, '../frontend');
module.exports = {
    webpack: (config, env) => {
        config.target = 'electron-renderer';
        config.resolve.plugins = config.resolve.plugins.filter(
            plugin => !(plugin instanceof ModuleScopePlugin)
        );
        if (process.env.APP_TYPE === 'docs') {
            const mockModules = require('@dashpad/core/resolve');
            config.target = undefined;

            config.resolve.alias = {
                ...config.resolve.alias,
                ...mockModules,
                initState: '@dashpad/frontend/documents/initState',
            };
            config.node = { fs: 'empty' };
        } else {
            config.resolve.alias = {
                ...config.resolve.alias,
                initState: '@dashpad/frontend/dashpad/initState',
            };
        }
        config.resolve.modules = [...config.resolve.modules, frontendPath];
        config.externals = {
            '@mdx-js/react': 'require("@mdx-js/react")',
            react: 'require("react")',
        };
        config.module.rules = config.module.rules.map(rule => {
            if (rule.oneOf instanceof Array) {
                if (process.env.APP_TYPE === 'docs') {
                    rule.oneOf = rule.oneOf.map(oneOfRule => {
                        if (
                            String(oneOfRule.test) ===
                            String('/\\.(js|mjs|jsx|ts|tsx)$/')
                        ) {
                            oneOfRule.include = [frontendPath];
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
                            include: [frontendPath],
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
            basePath = docsBasePath;
        } else {
            basePath = dashpadBasePath;
        }
        process.env.SKIP_PREFLIGHT_CHECK = true;
        paths.appIndexJs = path.join(basePath, 'index.js');
        paths.appBuild = path.resolve(
            __dirname,
            '../../',
            process.env.APP_TYPE || 'build'
        );
        paths.appPublic = path.resolve(__dirname, '../../', 'public');
        paths.appHtml = path.resolve(__dirname, '../../', 'public/index.html');
        paths.appSrc = frontendPath;
        return {
            ...paths,
        };
    },
};
