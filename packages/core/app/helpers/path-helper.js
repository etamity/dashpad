const path = require('path');
const homedir = require('os').homedir();
const config = require('@dashpad/config').value();
const fileManager = require('../../libs/file-manager');
const BackendStore = require('../store');
const WORKSPACE = path.join(homedir, config.project.root);
const PACKAGES = path.join(WORKSPACE, 'packages');


const getDashSpace = packageName =>
    path.join(PACKAGES, packageName, config.project.folder);

const getPackagePath = packageName =>
    path.join(PACKAGES, packageName);

const getDashConfigFile = packageName =>
    path.join(getDashSpace(packageName), config.project.config);

const getPackageJsonFile = packageName =>
    path.join(getPackagePath(packageName), 'package.json');

const getCurrentDashSpace = ()=> {
    const { packageName } = BackendStore.get().app.packageInfo;
    return getDashSpace(packageName);
}
const getCurrentPackagePath = ()=> {
    const { packageName } = BackendStore.get().app.packageInfo;
    return getDashSpace(packageName);
}

const getAllPackagesName = () => {
    fileManager.createFolder(PACKAGES);
    return fileManager
        .getFiles(PACKAGES, '**/package.json')
        .map(path => {
            const packageName = path.split('packages/')[1];
            return packageName.substring(0, packageName.lastIndexOf('/'));
        });
};


const getAllDashSpace = () =>
    getAllPackagesName().map(packageName => getDashSpace(packageName));

const getAllPackageJsonFiles = () => fileManager.getFiles(PACKAGES, '**/package.json');


const getAllDashConfigFiles = () => getAllPackagesName().map(packageName => ({	
        packageName,	
        file: getDashConfigFile(packageName),	
    }));

module.exports = {
    WORKSPACE,
    PACKAGES,
    getDashSpace,
    getDashConfigFile,
    getPackageJsonFile,
    getAllDashSpace,
    getAllPackagesName,
    getAllDashConfigFiles,
    getAllPackageJsonFiles,
    getPackagePath,
    getCurrentDashSpace,
    getCurrentPackagePath
};
