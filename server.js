require("util").inspect.defaultOptions.depth = null;
const config = require('./backend/configs/config').value();
const port = config.port;
const express = require('express');
const app = express();
const packageJson = require('./package.json');
const proxy = require('express-http-proxy');
const server = require('http').createServer(app);

function dynamic(lib) {
    return function (req, res, next) {
      return require(lib).apply(this, arguments)
    }
}

try {
    app.use(
        dynamic('./backend/api/index')
    );

} catch (error) {
    console.log(error);
}
app.use('/', proxy(packageJson.proxy));

console.log(`Api Server http://localhost:${port}/`);
server.listen(port);

module.exports = app;
