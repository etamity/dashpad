#!/usr/bin/env node
async function dev() {
  const { npx, npxSync} = require('node-npx')
  const cwd = process.cwd()

  const startMainProcess = async () => {
    let child = await npx('react-app-rewired', ['start'], { cwd, stdio: 'inherit' })
    child.on('close', () => {
      process.exit(0)
    })
    npxSync('node', ['electron/wait-react.js'], { cwd, stdio: 'inherit' })
    return child;
  }

  startMainProcess()

  const killWholeProcess = () => {
    console.log('Application Exit');
  }

  process.on('SIGINT', killWholeProcess)
  process.on('SIGTERM', killWholeProcess)
  process.on('exit', killWholeProcess)
}

dev()
