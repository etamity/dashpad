const fse = require('fs-extra');
const shell = require('shelljs');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const yaml = require('./yaml');
const nodePath = require('path');
const glob = require('glob');
const mdxLoader = require('./mdxLoader');

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
    loadFile: path => {
        return fse.readFileSync(nodePath.resolve(path), 'utf8');
    },
    loadJsonDb: path => {
        const dir = nodePath.resolve(path.substring(0, path.lastIndexOf('/')));
        if (!fse.existsSync(dir)) {
            fse.ensureDirSync(dir);
        }
        return low(new FileSync(path));
    },
    loadMdxFile: path => {
        return mdxLoader(path);
    },
    loadJson: path => {
        try {
            const ext = nodePath.extname(path);
            const resolvePath = nodePath.resolve(path);
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
    read: path => {
        return new Promise((resolve, reject) => {
            fse.readFile(path, 'utf8', function(error, data) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(data);
            });
        });
    },
    write: (path, data) => {
        return new Promise((resolve, reject) => {
            fse.writeFile(path, data, 'utf8', function(error) {
                if (error) {
                    console.error(error);
                    reject(error);
                    return;
                }
                resolve();
            });
        });
    },
    writeSync: (path, data) => {
        return fse.writeFileSync(path, data, 'utf8');
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
