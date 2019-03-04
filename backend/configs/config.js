const electron = require('electron');
const nodePath = require('path');
const fse = require('fs-extra');
const immutable = require('object-path-immutable');

const app = electron.app || (electron.remote && electron.remote.app);

const isEnvSet = 'ELECTRON_IS_DEV' in process.env;
const getFromEnv = parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;
const devMode = isEnvSet ? getFromEnv : !(app && app.isPackaged);

const configPath = nodePath.resolve('db/db.json');

const config = () => fse.readJsonSync(configPath);


const Config = {
    set: (keyPath, value) => {
        const newConfig = immutable(config()).set('config.' + keyPath, value).value();
        fse.writeJSONSync(configPath, newConfig, { spaces: 2});
        return newConfig;
    },
    value: () => {
        return config().config;
    }
};

Config.set('config.devMode', devMode);


module.exports = Config;
