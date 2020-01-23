const fse = require('fs-extra');
const shell = require('shelljs');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const yaml = require('./yaml');
const nodePath = require('path');
const glob = require('glob');

module.exports = {
    isExist: path => {
        return fse.existsSync(path);
    },
    getDirs: path => {
        return fse.readdirSync(path).sort();
    },
    getFiles: (path, patttern = '**/*.yml') => {
        return glob.sync(`${path}/${patttern}`, {
            ignore: ['**/node_modules/**', './node_modules/**'],
        });
    },
    createFolder: path => {
        fse.ensureDirSync(path);
    },
    deleteFoler: path => {
        return shell.exec(`rm -rf ${path}`);
    },
    loadFile: filePath => {
        return fse.readFileSync(nodePath.resolve(filePath), 'utf8');
    },
    loadJsonDb: filePath => {
        const dir = nodePath.resolve(filePath.substring(0, filePath.lastIndexOf('/')));
        if (!fse.existsSync(dir)) {
            fse.ensureDirSync(dir);
        }
        return low(new FileSync(filePath));
    },
    overrideJson: (filePath, merged) => {
        const resolvePath = nodePath.resolve(filePath);
        const json = fse.readJsonSync(resolvePath);
        const newJson = { ...json, ...merged };
        fse.writeJSONSync(filePath, newJson, {
            spaces: 2
        });
    },
    writeJson: (filePath, json) => {
        fse.writeJSONSync(filePath, json, {
            spaces: 2
        });
    },
    loadJson: filePath => {
        try {
            const ext = nodePath.extname(filePath);
            const resolvePath = nodePath.resolve(filePath);
            if (ext === '.json') {
                return fse.readJsonSync(resolvePath);
            } else if (ext === '.yml') {
                return yaml.load(resolvePath);
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
        }
    },
    read: filePath => {
        return new Promise((resolve, reject) => {
            fse.readFile(filePath, 'utf8', function(error, data) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(data);
            });
        });
    },
    write: (filePath, data) => {
        return new Promise((resolve, reject) => {
            fse.writeFile(filePath, data, 'utf8', function(error) {
                if (error) {
                    console.error(error);
                    reject(error);
                    return;
                }
                resolve();
            });
        });
    },
    writeSync: (filePath, data) => {
        return fse.writeFileSync(filePath, data, 'utf8');
    },
    copyFolder: (from, to, options) => {
        console.log('Copy From', from, 'to', to);
        return new Promise((resolve, reject) => {
            fse.copy(from, to, options, err => {
                if (err) {
                    console.error(err);
                    reject();
                }
                resolve();
            });
        });
    },
    copyFiles: (from, to) => {
        let command = `cp -r ${from} ${to}`;
        console.log('running command: ' + command);
        return shell.exec(command);
    },
};
