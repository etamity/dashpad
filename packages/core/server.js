require('@dashpad/babel-preset/babel-transpile');
require('util').inspect.defaultOptions.depth = null;
const config = require('@dashpad/config').value();
const { port, uiport } = config;
const express = require('express');
const app = express();
const proxy = require('express-http-proxy');
const server = require('http').createServer(app);

function dynamic(lib) {
    return function(req, res, next) {
        return require(lib).apply(this, arguments);
    };
}

try {
    app.use(dynamic('./api/index'));
} catch (error) {
    console.log(error);
}
const isDev = process.argv.indexOf('--noDevServer') === -1;

if (isDev) {
    app.use('/', proxy(`http://localhost:${uiport}`));
}

console.log(`Api Server http://localhost:${port}/`);

server.listen(port);

module.exports = app;
