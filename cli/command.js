#!/usr/bin/env node
const cmd = require('commander');
const packageJson = require('../package.json');
const projectVersion = packageJson.version;
const shell = require('shelljs');
const pwd = process.cwd();

cmd
    .version(projectVersion);

cmd
    .command('new [option]')
    .description('Create new plugin')
    .action((option) => {
        console.log(option);
    });



cmd.parse(process.argv);

if (!cmd.args.length) {
    cmd.help();
}

