const Config = require('@dashpad/config');
const _ = require('lodash');
const PackageJson = require('../package.json');
const defaultConfig = require('@dashpad/config/db/default_db.json');
const version = Config.get('version');

if (PackageJson.version !== version) {
    if (!version) {
        Config.set('version', PackageJson.version);
        Config.set('project.root', defaultConfig.config.project.root);
    } else {
        // TODO
    }
}

console.log('Dashpad is up to dated!');