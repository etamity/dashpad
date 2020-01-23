#!/usr/bin/env node
const cmd = require('commander');
const path = require('path');
const packageJson = require.resolve('../../package.json');
const projectVersion = packageJson.version;
const shell = require('shelljs');
const dashpadPath = path.resolve(__dirname + '/../');
const pluginPath = process.cwd();
const log = require('@dashpad/core/libs/log');
const fileManager = require('@dashpad/core/libs/file-manager');

cmd.version(projectVersion);

cmd.command('new [pluginName]')
    .description('Create new plugin')
    .action(pluginName => {
        const targetPath = path.join(pluginPath, pluginName);
        const sourcePath = path.resolve(dashpadPath, 'templates/plugin-template/');
        if (!fileManager.isExist(targetPath)) {
            shell.cp('-R', sourcePath, targetPath);
            const packageJsonPath = path.join(targetPath, 'package.json');
            fileManager.overrideJson(packageJsonPath, {
                name: pluginName
            });
            log.success(`New dashpad plugin created: ${pluginName}`);
            log.info(`Run command:`);
            log.info(`cd ${pluginName} && dashpad .`);
            log.info(`to start dashpad!`);
        } else {
            log.error(`${pluginName} folder already existed!`);
        }

    });

cmd.command('.').description('Start dashpad with current folder').action(() => {
    log.info('starting ... ', pluginPath);
    shell.cd(dashpadPath);
    shell.exec(`APP_PWD=${pluginPath} npm run electron:bundle`);
});

cmd.command('start').description('Start dashpad with current folder').action(() => {
    log.info('starting ... ', pluginPath);
    shell.cd(dashpadPath);
    shell.exec(`APP_PWD=${pluginPath} npm run electron:bundle`);
});

cmd.description('publish').action(() => {
    log.info('publish ... ');
});

cmd.parse(process.argv);

if (!cmd.args.length) {
    cmd.help();
}
