const config = require('./backend/configs/config').value();
process.env.PORT = config.uiport;
process.env.CHOKIDAR_USEPOLLING = config.env.CHOKIDAR_USEPOLLING;
process.env.SKIP_PREFLIGHT_CHECK = config.env.SKIP_PREFLIGHT_CHECK;
const {
  checkUpdate,
  pullUpdate
} = require('./updater');

async function dev() {
    const { npx, npxSync } = require('node-npx');
    const cwd = process.cwd();
    const web_env = Object.assign({}, process.env, {
        NODE_PATH: config.env.WEB_NODE_PATH,
        NODE_TLS_REJECT_UNAUTHORIZED: 0
    });
    const startMainProcess = async () => {
        let child = await npx(`react-app-rewired`, ['start'], {
            cwd,
            stdio: 'inherit',
            env: web_env,
        });
        child.on('close', () => {
            process.exit(0);
        });
        npxSync('node', ['electron/wait-react.js'], {
            cwd,
            stdio: 'inherit'
        });
        return child;
    };

    startMainProcess();

    const killWholeProcess = () => {
        console.log('Application Exit');
    };

    process.on('SIGINT', killWholeProcess);
    process.on('SIGTERM', killWholeProcess);
    process.on('exit', killWholeProcess);
}

// checkUpdate().then(result => {
//   console.log(result);
//   if (result.status === true) {
//     console.log('New update detected !');
//     pullUpdate().then(log => {
//       console.log('Updated code has pulled !');
//       dev();
//     }).catch(error => {
//       console.error(error);
//     });
//   } else {
//     dev();
//   }
// }).catch(error => {
//   console.error(error);
//     dev();
// });
dev();