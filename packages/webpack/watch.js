const path = require('path');
const invalidate = require('invalidate-module');
const pathHelper = require('@dashpad/core/app/helpers/path-helper');
const production = process.env.NODE_ENV === 'production';
const log = require('@dashpad/core/libs/log');
// const { app } = require('electron');
// const { npxSync} = require('node-npx');
// const cwd = process.cwd()
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', reason.stack || reason);
    // Recommended: send the information to sentry.io
    // or whatever crash reporting service you use
});
process.on('uncaughtException', function(err) {
    console.error('Caught exception: ', err);
});

const requireNoCache = function(filePath) {
    invalidate(filePath);
    return require(filePath);
};

const watchFiels = ['*.yml', '*.yaml', '*.js', '*.mdx'].map(ext =>
    path.join(pathHelper.PACKAGES, '/**/', ext)
);

const watchCoreJsFile = path.resolve(__dirname, '../packages/core/**/*.js');

if (!production) {
    const chokidar = require('chokidar');
    const watcher = chokidar.watch([watchCoreJsFile, ...watchFiels], {
        ignored: /node_modules|\.git/,
    });
    watcher.on('ready', () => {
        log.info('Start Watching ...');
        watcher.on('change', filePath => {
            if (filePath.includes('/packages/core/')) {
                log.warn('Clearing /backend module cache from server');
                requireNoCache(path.resolve(filePath));
                log.info('Reloaded:', filePath);
            }
            if (filePath.includes('/packages/')) {
                const contentLoader = requireNoCache(
                    '@dashpad/core/app/content-loader.js'
                );
                if (filePath.includes('/_dash/')) {
                    log.info('Reload ... UI files', filePath, filePath.includes('.yml'));
                    if (filePath.includes('.yml')) {
                        contentLoader.reloadConfig();

                        if (!filePath.includes('config.yml')) {
                            const fileName = filePath.slice(
                                filePath.lastIndexOf('/')
                            );
                            if (fileName.includes('@')) {
                                contentLoader.reloadUISchema();
                            } else {
                                contentLoader.reloadUISchema(filePath);
                            }
                        }

                        log.info('Reloaded:', filePath);
                    } else if (filePath.includes('.js')) {
                        log.info('Reload ... js file', filePath);
                        contentLoader.reloadScript(filePath);
                    } else if (filePath.includes('.mdx')) {
                        log.info('Reload ... mdx file');
                        contentLoader.reloadUISchema(filePath);
                    }
                }
            }
        });
    });
}
