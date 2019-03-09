const path = require('path');
const invalidate = require('invalidate-module');
const pathHelper = require('./backend/app/helpers/path-helper');
const production = process.env.NODE_ENV === 'production';
const log = require('./backend/libs/log');
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



if (!production) {
    const chokidar = require('chokidar');
    const watcher = chokidar.watch(['./backend/**/*.js', path.join(pathHelper.PACKAGES, '/**/*.yml')]);
    watcher.on('ready', () => {
        watcher.on('change', filePath => {
            if (filePath.includes('backend/')) {
                log.warn('Clearing /backend module cache from server');
                requireNoCache(path.resolve(filePath));
                // Object.keys(require.cache).forEach((id) => {
                //     if (/[\/\\]backend[\/\\]/.test(id)) {
                //         console.log(id);
                //         requireNoCache(id);
                //     }
                // });
                //app.exit(0);
                //npxSync('node', ['electron/wait-react.js'], { cwd, stdio: 'inherit' })
          
                log.info('Reloaded:', filePath);
            }

            if (filePath.includes('.yml')) {
                console.log('Reload ... UI files', filePath);
                const contentLoader = requireNoCache(
                    './backend/app/content-loader.js'
                );
        
                contentLoader.reloadConfig();
        
                if (!filePath.includes('config.yml')) {
                    contentLoader.reloadUISchema(filePath);
                }
        
                log.info('Reloaded:', filePath);
            }

        })
    });
}
