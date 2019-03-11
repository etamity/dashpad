const pathHelper = require('./path-helper');
const shell = require('shelljs');
const contentLoader = require('../content-loader');
const nodePath = shell.which('node').toString();

shell.config.execPath = nodePath;

const install = (packName, gitLink) => {
    const packSpace = pathHelper.PACKAGES;
    return new Promise((resolve, reject) => {
        shell.exec(
            `cd ${packSpace} && git clone ${gitLink} ${packName} && cd ${pathHelper.getPackagePath(packName)} && npm i && cd ${packSpace}`,
            (code, stdout, stderr) => {
                if (code !== 0) {
                  console.error(code, stderr);
                  shell.echo('Error: Git commit failed');
                    reject({code,stderr});
                }
                shell.echo('Plguin Installed');
                contentLoader.reloadConfig();
                resolve(stdout);
            }
        );
    });
};

const uninstall = packName => {
    const getPackPath = pathHelper.getPackagePath(packName);
    return new Promise((resolve, reject) => {
        if (shell.rm('-rf', getPackPath).code !== 0) {
            shell.echo('Error: Uninstall plugin failed');
            reject('Error: Uninstall plugin failed');
        } else {
            shell.echo('Plguin UnInstalled');
            contentLoader.reloadConfig();
            resolve();
        }
    });
};

module.exports = {
    install,
    uninstall,
};
