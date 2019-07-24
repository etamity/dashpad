const pathHelper = require('./path-helper');
const shell = require('shelljs');
const contentLoader = require('../content-loader');
const whichNode = shell.which('node');
const nodePath = whichNode && whichNode.toString();

if (nodePath) {
    shell.config.execPath = nodePath;
}

const install = (packName, gitLink) => {
    const packSpace = pathHelper.PACKAGES;
    return new Promise((resolve, reject) => {
        try {
            shell.exec(
                `cd ${packSpace} && git clone ${gitLink} ${packName} && cd ${packName} && npm i && cd ${packSpace}`,
                (code, stdout, stderr) => {
                    if (code !== 0) {
                        console.error(code, stderr);
                        shell.echo('Error: git pull failed');
                        reject({ code, stderr });
                    }
                    shell.echo('Plugin Installed');
                    contentLoader.reloadConfig();
                    resolve(stdout);
                }
            );
        } catch (error) {
            resolve();
            console.error(error);
        }
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
