const net = require('net');
const config = require('@dashpad/config').value();
const port = config.uiport;
const { npxSync } = require('node-npx')
//process.env.ELECTRON_START_URL = `http://localhost:${port}`;
const client = new net.Socket();
const path = require('path');
const cwd = process.cwd()
let startedElectron = false;


const tryConnection = () =>
    client.connect(
        { port },
        () => {
            client.end();
            if (!startedElectron) {
                console.log('starting electron');
                startedElectron = true;
                npxSync('electron', ['-r', '@babel/register', path.resolve(__dirname, 'src/main.js')], { cwd, stdio: 'inherit' })
            }
        }
    );

tryConnection();

client.on('error', error => {
    console.log(error);
    setTimeout(tryConnection, 2000);
});
