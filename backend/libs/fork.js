const { existsSync }  = require('fs')
const { fork }  = require('child_process')
const { resolve } = require('path')

const bin = (command) => {
  const possibleBin = resolve(command)
  return existsSync(possibleBin) ? possibleBin : command
}

const forkChild = (command, args, options) => {
    const childProcess = fork(bin(command), args, options)
  
    const exit = (code) => {
      if (code) {
        //process.exit(code)
      }
    }
  
    const detectCode = (code, signal) => {
      if (code !== null) {
        return code
      }
      if (signal) {
        if (signal === 'SIGKILL') {
          return 137
        }
        return 1
      }
      return 0
    }
  
    childProcess.on('close', (code, signal) => {
      const _code = detectCode(code, signal)
      if (_code !== 0) {
        exit(_code)
      }
      exit()
    })
  
    childProcess.on('error', (err) => {
      console.error(err)
      exit(1)
    })
  
    const wrapper = () => {
      if (childProcess) {
        childProcess.kill()
      }
    }
    process.on('SIGINT', wrapper)
    process.on('SIGTERM', wrapper)
    process.on('exit', wrapper)
  
    return childProcess
  }

module.exports = {
  fork: forkChild
}
