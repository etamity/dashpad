const path = require('path');
const pathHelper = require('@dashpad/core/app/helpers/path-helper');
const production = process.env.NODE_ENV === 'production';
const log = require('@dashpad/core/libs/log');
const invalidateModule = require('invalidate-module');
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
    invalidateModule(filePath);
    return require(filePath);
};

const watchFileYaml = ['*.yml', '*.yaml'];
const watchFileJsx = ['*.js', '*.jsx', '*.mdx'];

const watchFiles = [...watchFileYaml, ...watchFileJsx].map(ext =>
    path.join(pathHelper.PACKAGES, '/**/', ext)
);

const watchCoreJsFile = path.resolve(__dirname, '../core/**/*.js');

const allWatchFiles = [...watchFiles];

if (!production) {
    allWatchFiles.push(watchCoreJsFile);
}

const chokidar = require('chokidar');
const watcher = chokidar.watch(allWatchFiles, {
    ignored: /node_modules|\.git/,
});
watcher.on('ready', () => {
    log.info('Start Watching ...', watchCoreJsFile);
    watcher.on('change', filePath => {
        if (!production && filePath.includes('/packages/core/')) {
            log.warn('Clearing /backend module cache from server');
            requireNoCache(path.resolve(filePath));
            log.info('Reloaded:', filePath);
        }
        if (filePath.includes('/packages/')) {
            const contentLoader = requireNoCache(
                '@dashpad/core/app/content-loader.js'
            );
            if (filePath.includes('/_dash/')) {
                log.info('Reload ... UI files');
                const filename = filePath.split('/').pop();
                const fileExt = '*.' + filename.split('.').pop();
                if (watchFileYaml.includes(fileExt)) {
                    if (filename.includes('config')) {
                        contentLoader.reloadConfig();
                    } else {
                        contentLoader.reloadUIFile();
                    }
                } else if (watchFileJsx.includes(fileExt)) {
                    contentLoader.reloadUIFile();
                }
            }
        }
    });
});
