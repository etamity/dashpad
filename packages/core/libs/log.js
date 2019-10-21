require('util').inspect.defaultOptions.depth = null;
const chalk = require('chalk');
const log = console.log;
const error = chalk.bold.red;
const warn = chalk.keyword('orange');
const success = chalk.green;
const info = chalk.cyanBright;
module.exports = {
  log,
  error: function(...args) {
    log(error('[Error]'), error(...args));
  },
  warn: function(...args) {
    log(warn('[Warn]'), warn(...args));
  },
  success: function(...args) {
    log(success('[Success]'), success(...args));
  },
  info: function(...args) {
    log(info('[Info]'),  info(...args));
  }
};
