const fs = require('fs');
const fse = require('fs-extra');
const shell = require('shelljs');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const yaml = require('js-yaml');
const nodePath = require('path');

module.exports = {
    isExist: (path) => {
        return fs.existsSync(path);
    },
    getDirs: (path) => {
        return fs.readdirSync(path).sort();
    },
    createFolder:(path) => {
        fse.ensureDirSync(path);
    },
    deleteFoler: (path) =>{
        return shell.exec(`rm -rf ${path}`);
    },
    loadJsonDb: (path) => {
        const dir = nodePath.resolve(path.substring(0, path.lastIndexOf('/')));
        if (!fse.existsSync(dir)) {
            fse.ensureDirSync(dir);
        }
        return low(new FileSync(path));
    },
    loadJson: (path) => {
        try {
            const ext = nodePath.extname(path);
            const resolvePath = nodePath.resolve(path);
            if (ext === '.json') {
                return fse.readJsonSync(resolvePath)
            } else if (ext === '.yml') {
                return yaml.safeLoad(fs.readFileSync(resolvePath, 'utf8'))
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
        }
        
    },
    read: (path) => {
        return new Promise((resolve, reject) => {
            fs.readFile(path, 'utf8', function (error, data) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(data);

            });
        });
    },
    write:(path, data) => {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, data, 'utf8', function (error) {
                if (error) {
                    console.error(error);
                    reject(error);
                    return;
                }
                resolve();
            });
        });
    },
    copyFolder:(from, to, options) => {
        console.log('Copy From', from, 'to', to);
        return new Promise((resolve, reject) => {
            fse.copy(from, to, options, err => {
                if (err) {
                    console.error(err);
                    reject();
                }
                resolve();
            })
        });
    },
    copyFiles: (from, to) => {
        let command = `cp -r ${from} ${to}`;
        console.log('running command: ' + command);
        return shell.exec(command);

    }
}