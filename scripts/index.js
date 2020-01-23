const Config = require('@dashpad/config');
const path = require('path');
const PackageJson = require('../package.json');
const version = Config.get('version');
const shell = require('shelljs');
const dashpadPath = path.resolve(__dirname + '/../');

if (PackageJson.version !== version) {
    if (!version) {
        Config.set('version', PackageJson.version);
    } else {
        let settings;
        switch(PackageJson.version) {
            case '1.2.0':
                settings = Config.get('settings');
                delete settings.plugins;
                Config.set('settings', settings);
                break;
            case '1.2.8':
                settings = Config.get('settings');
                const newSetting = { ...settings, platform: Config.default().settings.platform };
                Config.set('settings', newSetting);
                break;
            default:
                break;
        }
        Config.set('version', PackageJson.version);
    }
}
// shell.cd(dashpadPath);
// shell.exec('npm run build');

console.log('Dashpad is up to dated!', PackageJson.version ,version);