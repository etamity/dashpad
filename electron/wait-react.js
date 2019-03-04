const net = require('net');
const config = require('../backend/configs/config').value();
const port = config.uiport;
const { npxSync } = require('node-npx')
process.env.ELECTRON_START_URL = `http://localhost:${port}`;
const client = new net.Socket();

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
                npxSync('electron', ['.'], { cwd, stdio: 'inherit' })
            }
        }
    );

tryConnection();

client.on('error', error => {
    console.log(error);
    setTimeout(tryConnection, 2000);
});
