require('util').inspect.defaultOptions.depth = null;
const path = require('path');
const images = require('remark-images');
const emoji = require('remark-emoji');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const docsBasePath = path.resolve(__dirname, '../frontend/documents');
const dashpadBasePath = path.resolve(__dirname, '../frontend/dashpad');
const frontendPath = path.resolve(__dirname, '../frontend');
const Config = require('webpack-chain');
const webpackConfig = new Config();
module.exports = {
    webpack: (config, env) => {
        webpackConfig.merge({ ...config });
        webpackConfig.target('electron-renderer');
        webpackConfig.resolve.plugins.delete(ModuleScopePlugin);

        if (process.platform === 'win32') {
            webpackConfig
                .plugin('progress')
                .use(require('progress-bar-webpack-plugin'));
        } else {
            webpackConfig.plugin('progress').use(require('webpackbar'), [
                {
                    color: 'green',
                    reporters: ['fancy'],
                },
            ]);
        }

        if (process.env.APP_TYPE === 'docs') {
            const mockModules = require('@dashpad/core/resolve');
            webpackConfig.target(undefined);

            for (const key in mockModules) {
                webpackConfig.resolve.alias.set(key, mockModules[key]);
            }
            webpackConfig.resolve.alias.set(
                'initState',
                '@dashpad/frontend/documents/initState'
            );
            webpackConfig.node.set('fs', 'empty');
        } else {
            webpackConfig.node.set('__filename', true).set('__dirname', true);
            webpackConfig.resolve.alias.set(
                'initState',
                '@dashpad/frontend/dashpad/initState'
            );
        }

        webpackConfig.resolve.modules.add(frontendPath).end();

        webpackConfig.module
            .rule('compile')
            .oneOf('jsx')
            .test(/\.(js|mjs|jsx|ts|tsx)$/)
            .pre()
            .include.add(frontendPath)
            .end();

        webpackConfig.module
            .rule('compile')
            .oneOf('mdx')
            .test(/\.mdx?$/)
            .include.add(frontendPath)
            .end()
            .use('babel-loader')
            .loader('@mdx-js/loader')
            .options({
                remarkPlugins: [images, emoji],
            });

        console.log(webpackConfig.toString());
        throw Error();
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
