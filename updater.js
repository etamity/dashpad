const shell = require('shelljs');
const checkUpdate = () => {
    console.log('Checking new updates ...');
    return new Promise((resolve, reject) => {
        let currentPath = process.cwd();
        let command = `cd ${currentPath}`;
        command = `${command} && git rev-parse HEAD`;
        const child = shell.exec(command, { async: true });
        child.stdout.on('data', local => {
            let localHash = local.split('\n')[0];
            command = `git ls-remote origin master`;
            const child_next = shell.exec(command, { async: true });
            child_next.stderr.on('data', local => {
                console.log('err', local);
                reject(local);
            });
            child_next.stdout.on('data', remote => {
                let remoteHash = remote.split('\t')[0];
                let result = {
                    status: localHash !== remoteHash,
                    localHash,
                    remoteHash,
                };
                resolve(result);
            });
        });
    });
};

const pullUpdate = () => {
    console.log('Pulling new changes ...');
    return new Promise((resolve, reject) => {
        let currentPath = process.cwd();
        let command = `cd ${currentPath}`;
        command = `${command} && git pull --allow-unrelated-histories`;
        const child = shell.exec(command, { async: true });
        child.stdout.on('data', result => {
            console.log(result);
            resolve(result);
        });
    });
};

module.exports = {
    checkUpdate,
    pullUpdate
};
