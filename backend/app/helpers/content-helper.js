const pathHelper = require('./path-helper');
const fileManager = require('../../libs/file-manager');
const loadJson = fileManager.loadJson;

const loadConfigs = () =>
    pathHelper.getAllDashConfigFiles().map(packageModule =>
        Object.assign({}, packageModule, {
            content: loadJson(packageModule.file),
        })
    );

const loadNavs = () =>
    loadConfigs()
        .map(config => ({
            ...config,
            content: (config.content && config.content.navs) || [],
        }))
        .filter(config => !!config.content)
        .map(config =>
            config.content.map(nav => ({
                ...nav,
                packageName: config.packageName,
            }))
        )
        .reduce((result, next) => result.concat(next), []);



const loadPackageJson = (packageName) => loadJson(pathHelper.getPackageJsonFile(packageName));


module.exports = {
    loadConfigs,
    loadNavs,
    loadJson,
    loadPackageJson
};
