const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const url = require('url');
const config = require('@dashpad/config').value();
const port = config.uiport;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;
const isEnvSet = 'ELECTRON_IS_DEV' in process.env;
const getFromEnv = parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;
const devMode = isEnvSet ? getFromEnv : !(app && app.isPackaged);
// Keep a reference for dev mode
const packageJson = require(path.join(__dirname, '../../package.json'));

const installExtensions = async () => {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];
    await Promise.all(
        extensions.map(name =>
            installer.default(installer[name], forceDownload)
        )
    ).catch(err => console.error(err));
};

function buildMenu() {
    const menu = Menu.buildFromTemplate([
        {
            label: 'Menu',
            submenu: [
                {
                    label: 'Clear Session',
                    accelerator: 'Command+L',
                    click() {
                        mainWindow.webContents.session.clearStorageData();
                    },
                },
                {
                    label: 'Inspector',
                    click() {
                        mainWindow.webContents.openDevTools();
                    },
                },
                { type: 'separator' },
                {
                    label: 'Exit',
                    accelerator: 'Command+Q',
                    click() {
                        app.quit();
                    },
                },
            ],
        },
        {
            label: 'Edit',
            submenu: [
                {
                    label: 'Undo',
                    accelerator: 'CmdOrCtrl+Z',
                    selector: 'undo:',
                },
                {
                    label: 'Redo',
                    accelerator: 'Shift+CmdOrCtrl+Z',
                    selector: 'redo:',
                },
                { type: 'separator' },
                { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
                {
                    label: 'Copy',
                    accelerator: 'CmdOrCtrl+C',
                    selector: 'copy:',
                },
                {
                    label: 'Paste',
                    accelerator: 'CmdOrCtrl+V',
                    selector: 'paste:',
                },
                {
                    label: 'Select All',
                    accelerator: 'CmdOrCtrl+A',
                    selector: 'selectAll:',
                },
            ],
        },
        {
            label: 'Window',
            submenu: [
                {
                    label: 'Refresh',
                    accelerator: 'CmdOrCtrl+R',
                    click: () => {
                        mainWindow.reload();
                    },
                },
            ],
        },
        {
            label: 'About',
            submenu: [{ label: `v${packageJson.version}` }],
        },
    ]);
    Menu.setApplicationMenu(menu);
}

function createWindow() {
    // Create the browser window.
    global.mainWindow = mainWindow = new BrowserWindow({
        ...config.window,
        icon: path.resolve('../../public/icon.icns'),
    });
    buildMenu();
    let indexPath;
    const isDev = devMode && process.argv.indexOf('--noDevServer') === -1;
    if (isDev) {
        indexPath = 'http://localhost:' + port + '/#/dashboard';
        installExtensions();
    } else {
        indexPath =
            url.format({
                protocol: 'file:',
                pathname: path.join(__dirname, '../../build', 'index.html'),
                slashes: true,
            }) + '#/dashboard';
    }
    mainWindow.loadURL(indexPath);
    console.log('indexPath', indexPath);
    // Don't show until we are ready and loaded
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        if (isDev) {
            mainWindow.webContents.openDevTools();
        }
        require('../webpack/watch.js');
        require('../core/server.js');
        // Open the DevTools automatically if developing
    });

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
        app.quit();
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

app.on('browser-window-focus', () => {
    mainWindow &&
        mainWindow.webContents &&
        mainWindow.webContents.send('ON_WINDOW_ACTIVE');
});

// SSL/TSL: this is the self signed certificate support
app.on(
    'certificate-error',
    (event, webContents, url, error, certificate, callback) => {
        // On certificate error we disable default behaviour (stop loading the page)
        // and we then say "it is all fine - true" to the callback
        event.preventDefault();
        callback(true);
    }
);
const shellEnv = require('shell-env');
process.env.PATH = shellEnv.sync().PATH;

module.exports = app;
