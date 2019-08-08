const chalk = require('chalk');
const util = require('util');
const log = console.log;
const error = chalk.bold.red;
const warn = chalk.keyword('orange');
const success = chalk.green;
const info = chalk.cyanBright;

const inspect = function() {
    return [].slice
        .apply(arguments)
        .map(val =>
            typeof val === 'object'
                ? util.inspect(val, { colors: true, depth: null })
                : val
        )
        .join(' ');
};

module.exports = {
    log,
    error: function() {
        log(error(inspect(arguments)));
    },
    warn: function() {
        log(warn(inspect(arguments)));
    },
    success: function() {
        log(success(inspect(arguments)));
    },
    info: function() {
        log(info(inspect(arguments)));
    },
};
