require("util").inspect.defaultOptions.depth = null;
const path = require('path');
const images = require('remark-images')
const emoji = require('remark-emoji')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const mockModules = require('./resolve/index.js');
// const rewireReactHotLoader = require('react-app-rewire-hot-loader');

module.exports = {
    webpack: (config, env) => {
        // if (env == "development") {
        //     config.resolve.alias["react-dom"] = "@hot-loader/react-dom";
        // }
        // config = rewireReactHotLoader(config, env);
        //do stuff with the webpack config...
        config.target = 'electron-renderer';
        if (process.env.APP_TYPE === 'docs') {
            config.target = undefined;
            config.resolve.plugins = config.resolve.plugins.filter(
                plugin => !(plugin instanceof ModuleScopePlugin)
            );

            config.resolve.alias = Object.assign({}, config.resolve.alias, mockModules);
            config.node = { fs: 'empty' };
        }

        // config.module.rules[1].include = [
        //     path.resolve(__dirname, 'src'),
        //     path.resolve(__dirname, 'docs'),
        // ];
        // config.module.rules.push({
        //     test: /\.(js|jsx|mdx|md)$/,
        //     use: 'react-hot-loader/webpack',
        //     include: /node_modules/
        //   });
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
        // console.log(config.module);
        // throw Error();
        return config;
    },
    paths: paths => {
        // console.log(paths);
        // throw Error();
        if (process.env.APP_TYPE === 'docs') {
            paths.appIndexJs = path.resolve(__dirname, 'src/docs/index.js');
            paths.appBuild = path.resolve(__dirname, 'docs');
            // console.log(paths);
            // throw Error();
        }
        return {
            ...paths,
        };
    }
};
