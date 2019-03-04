'use strict';
// Import parts of electron to use
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const config = require('../backend/configs/config').value();
const port = config.uiport;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

// Keep a reference for dev mode
const installExtensions = async () => {
    const installer = require('electron-devtools-installer');
    // NOTE: we shoud run `UPGRADE_EXTENSIONS=true yarn dev` after upgrade react
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];
    await Promise.all(
      extensions.map(name => installer.default(installer[name], forceDownload))
    ).catch(err => console.error(err));
  };

function createWindow() {
    // Create the browser window.
    global.mainWindow = mainWindow = new BrowserWindow(config.window);

    // and load the index.html of the app.
    let indexPath;
    if (config.devMode && process.argv.indexOf('--noDevServer') === -1) {
        indexPath = url.format({
            protocol: 'http:',
            host: 'localhost:' + port,
            pathname: '',
            slashes: true,
        });
        installExtensions();
    } else {
        indexPath = url.format({
            protocol: 'file:',
            pathname: path.join(__dirname, '/../build', 'index.html'),
            slashes: true,
        });
    }
    mainWindow.loadURL(indexPath);
    console.log('indexPath', indexPath);
    // Don't show until we are ready and loaded
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        require('../server');
        mainWindow.webContents.openDevTools();
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

module.exports = app;
