const { spawn } = require('child_process');

function getLocalIp() {
    var os = require('os');
    var ifaces = os.networkInterfaces();
    var values = Object.keys(ifaces).map(function(name) {
      return ifaces[name];
    });
    values = [].concat.apply([], values).filter(function(val){ 
      return val.family === 'IPv4' && val.internal === false; 
    });
  
    return values.length ? values[0].address : '0.0.0.0';
}
function npmInstall(path) {
  return new Promise((resolve,  reject) => {
      var npm = spawn('npm', ['install'], { cwd: path });
      npm.stdout.on('data', function(data) {
          console.log(data.toString());
      });
      npm.stderr.on('data', function(data) {
          console.warn(data.toString());
          reject(data);
      });
      npm.on('close', function(code) {
          resolve(code)
      });

  });
}

module.exports = {
    getLocalIp,
    npmInstall,
};