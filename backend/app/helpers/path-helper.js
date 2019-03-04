const path = require('path');
const homedir = require('os').homedir();
const config = require('../../configs/config').value();
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

const getAllPackagesPath = () => {
    fileManager.createFolder(PACKAGES);
    return fileManager
        .getDirs(PACKAGES)
        .filter(packageName =>
            fileManager.isExist(getPackageJsonFile(packageName))
        );
};

const getAllDashSpace = () =>
    getAllPackagesPath().map(packageName => getDashSpace(packageName));

const getAllPackageJsonFiles = () =>
    getAllPackagesPath().map(packageName => ({
        packageName,
        file: getPackageJsonFile(packageName),
    }));

const getAllDashConfigFiles = () =>
    getAllPackagesPath().map(packageName => ({
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
    getAllPackagesPath,
    getAllDashConfigFiles,
    getAllPackageJsonFiles,
    getPackagePath,
    getCurrentDashSpace,
    getCurrentPackagePath
};
