const pathHelper = require('./path-helper');
const fileManager = require('../../libs/file-manager');
const Config = require('@dashpad/config');
const _ = require('lodash');
const { loadJson, loadFile, isExist, read } = fileManager;

const loadConfigs = () =>
    pathHelper.getAllDashConfigFiles().map(packageModule => ({
        ...packageModule,
        content: loadJson(packageModule.file),
    }));
const loadNavs = () =>
    loadConfigs()
        .map(config => {
            const settings = config.content && config.content.settings;
            const packageSettingKey = config.packageName.replace('/', '.');
            if (settings) {
                const currentSettings = Config.get(
                    `settings.plugins.${packageSettingKey}`
                );
                const mergeSettings = _.defaults(currentSettings, settings);
                Config.set(`settings.plugins.${packageSettingKey}`, mergeSettings);
            }
            return {
                ...config,
                content: (config.content && config.content.navs) || [],
            };
        })
        .filter(config => !!config.content)
        .map(config => {
            return config.content.map(nav => ({
                ...nav,
                packageName: config.packageName,
            }));
        })
        .reduce((result, next) => result.concat(next), []);

const loadPackageJson = packageName =>
    loadJson(pathHelper.getPackageJsonFile(packageName));


module.exports = {
    loadConfigs,
    loadNavs,
    loadJson,
    loadFile,
    loadPackageJson,
    isExist,
    read
};
