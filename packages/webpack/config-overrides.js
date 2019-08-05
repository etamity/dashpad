require("util").inspect.defaultOptions.depth = null;
const path = require('path');
const images = require('remark-images')
const emoji = require('remark-emoji')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const mockModules = require('@dashpad/resolve/index.js');

module.exports = {
    webpack: (config, env) => {

        config.target = 'electron-renderer';
        if (process.env.APP_TYPE === 'docs') {
            config.target = undefined;
            config.resolve.plugins = config.resolve.plugins.filter(
                plugin => !(plugin instanceof ModuleScopePlugin)
            );

            config.resolve.alias = Object.assign({}, config.resolve.alias, mockModules);
            config.node = { fs: 'empty' };
        }
        config.module.rules = config.module.rules.map(rule => {
            if (rule.oneOf instanceof Array) {
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
                                    remarkPlugins: [images, emoji]
                                  }
                                }
                              ],
                            include: [
                                path.resolve(__dirname, 'src'),
                            ],
                        },
                        ...rule.oneOf,
                    ],
                };
            }

            return rule;
        });

        return config;
    },
    paths: paths => {
        let basePath;
        if (process.env.APP_TYPE === 'docs') {
            basePath = '../documents';
        } else {
            basePath = '../ui';
        }
        process.env.SKIP_PREFLIGHT_CHECK=true;
        process.env.NODE_PATH= path.resolve(__dirname, basePath, 'src');
        paths.appIndexJs = path.resolve(__dirname, basePath, 'src/index.js');
        paths.appBuild = path.resolve(__dirname, basePath, 'build');
        paths.appPublic = path.resolve(__dirname, '../public');
        paths.appHtml = path.resolve(__dirname, '../public/index.html');
        paths.appSrc = path.resolve(__dirname, basePath, 'src');
        return {
            ...paths,
        };
    }
};
