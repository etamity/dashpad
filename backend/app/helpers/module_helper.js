const pathHelper = require('./path-helper');
const shell = require('shelljs');
const contentLoader = require('../content-loader');
const nodePath = (shell.which('node').toString());

shell.config.execPath = nodePath;

const install = (packName, gitLink) => {
    const packSpace = pathHelper.PACKAGES
    if (shell.exec(`cd ${packSpace} && git clone ${gitLink} ${packName} && npm i`).code !== 0) {
        shell.echo('Error: Git commit failed');
      } else {
        shell.echo('Plguin Installed');
        contentLoader.reloadConfig();
      };
}

const uninstall = (packName) => {
    const getPackPath = pathHelper.getPackagePath(packName);
    if (shell.rm('-rf', getPackPath).code !==0 ) {
        shell.echo('Error: Uninstall plugin failed');
    } else {
        shell.echo('Plguin UnInstalled');
        contentLoader.reloadConfig();
      };

}

module.exports = {
    install,
    uninstall
}