require("util").inspect.defaultOptions.depth = null;
const path = require('path');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

const images = require('remark-images')
const emoji = require('remark-emoji')

module.exports = {
    webpack: (config, env) => {
        //do stuff with the webpack config...
        config.target = 'electron-renderer';
        if (process.env.ENTRY_POINT) {
            config.entry = process.env.ENTRY_POINT;
            config.resolve.plugins = config.resolve.plugins.filter(
                plugin => !(plugin instanceof ModuleScopePlugin)
            );
        }

        config.module.rules[1].include = [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'docs'),
        ];
        config.module.rules = config.module.rules.map(rule => {
            if (rule.oneOf instanceof Array) {
                const jsx = rule.oneOf.find(item => {
                    console.log(item.include, item.include === path.resolve(__dirname, 'docs'));
                    return item.include && path.resolve(__dirname, 'docs')
                });
                jsx.include = [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'docs'),
                ];
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
                                path.resolve(__dirname, 'docs'),
                            ],
                        },
                        ...rule.oneOf,
                        jsx
                    ],
                };
            }

            return rule;
        });
        config.node = { fs: 'empty' };
        // console.log(config.module);
        // throw Error();
        return config;
    },
    paths: paths => {
        // console.log(paths);
        // throw Error();
        if (process.env.ENTRY_POINT) {
            paths.appSrc = path.resolve(__dirname, 'docs');
            paths.appIndexJs = path.resolve(__dirname, 'docs/index.js');
            paths.appBuild = path.resolve(__dirname, 'docs/build');
            // console.log(paths);
            // throw Error();
        }
        return {
            ...paths,
        };
    },
};
