const electron = require('electron');
const nodePath = require('path');
const fse = require('fs-extra');
const immutable = require('object-path-immutable');
const _ = require('lodash');
const app = electron.app || (electron.remote && electron.remote.app);

const isEnvSet = 'ELECTRON_IS_DEV' in process.env;
const getFromEnv = parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;
const devMode = isEnvSet ? getFromEnv : !(app && app.isPackaged);

const configPath = nodePath.resolve('db/db.json');

const defaultConfigPath = nodePath.resolve('db/default_db.json');

const defaultConfig =  fse.readJsonSync(defaultConfigPath);

const config = () => {
    if (!fse.existsSync(configPath)) {
        fse.writeJSONSync(configPath, defaultConfig)
    }
    return fse.readJsonSync(configPath);
}

const Config = {
    set: (keyPath, value) => {
        const newConfig = immutable(config()).set(`config.${keyPath}`, value).value();
        fse.writeJSONSync(configPath, newConfig, { spaces: 2});
        return newConfig;
    },
    get: (keyPath) => {
        return _.get(config(), `config.${keyPath}`);
    },
    delete: (keyPath)=> {
        const keyPathPrefix = `config.${keyPath}`;
        let newConfig = immutable.del(config(), keyPathPrefix);
        let aKeyPath = keyPathPrefix.substring(0, keyPathPrefix.lastIndexOf('.'));
        const packageSettings = _.get(newConfig, aKeyPath);
        if (_.isEmpty(packageSettings)) {
            newConfig = immutable.del(newConfig, aKeyPath);
        }
        fse.writeJSONSync(configPath, newConfig, { spaces: 2});
        return newConfig;
    },
    push: (keyPath, value) => {
        const newConfig = immutable.push(config(), `config.${keyPath}`, value);
        fse.writeJSONSync(configPath, newConfig, { spaces: 2});
        return newConfig;
    },
    value: () => {
        return config().config;
    },
    saveToFile:(configJson) => {
        fse.writeJSONSync(configPath, configJson, { spaces: 2});
    }
};

Config.set('devMode', devMode);


module.exports = Config;
