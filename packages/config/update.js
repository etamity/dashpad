// const Config = require('./config');
// const _ = require('lodash');
// const PackageJson = require('../../package.json');

// const version = Config.get('version');

// if (PackageJson.version !== version) {
//     switch (version) {
//         case '1.0.7':
//             const config = Config.value();
//             const password = _.get(config, 'settings.credential.password');
//             const base64Password = Buffer.from(password).toString('base64');
//             _.set(config, 'settings.credential.password', base64Password);
//             _.set(config, 'version', PackageJson.version);
//             Config.saveToFile({ config });
//             break;
//         default:
//             Config.set('version', PackageJson.version);
//     }
// }
