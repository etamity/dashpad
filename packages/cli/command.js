#!/usr/bin/env node
const cmd = require('commander');
const path = require('path');
const packageJson = require('../package.json');
const projectVersion = packageJson.version;
const shell = require('shelljs');
const cwd = process.cwd();
const dashpadDir = path.resolve(__dirname + '/../');
cmd.version(projectVersion);

cmd.command('new [option]')
    .description('Create new plugin')
    .action(option => {
        console.log(option);
    });

cmd.description('.').action(() => {
    console.log('starting ... ', dashpadDir + '/start.js');
    shell.cd(dashpadDir);
    shell.exec('npm start');
});

cmd.description('publish').action(() => {
    console.log('publish ... ');
});

cmd.parse(process.argv);

if (!cmd.args.length) {
    cmd.help();
}
