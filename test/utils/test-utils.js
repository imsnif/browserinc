import tmp      from 'tmp'
import fs       from 'fs'
import path     from 'path'
import find     from 'findit'
import { ncp }  from 'ncp'
import { fork } from 'child_process'

export default {
  prepareCase: function (dirName) {
    return new Promise((resolve, reject) => {
      tmp.dir({unsafeCleanup: true}, (err, tmpPath, cleanupCallback) => {
        ncp(dirName, tmpPath, (err) => {
          if (err) reject(err)
          resolve(tmpPath)
        })  
      })  
    })  
  },
  spawnCmd: function (cwd) {
    let cmd = path.join(__dirname, "..", "dist", "cmd.js")
    return new Promise((resolve, reject) => {
      let browserinc = fork(cmd, {cwd, silent: true})
      browserinc.stderr.on("error", (err) => {
        browserinc.kill()
        reject(err)
      })
      browserinc.on("exit", (exitCode) => {
        resolve(cwd)
      })
    })
  },
  findOccurrences: function (mod, cwd) {
    return new Promise((resolve, reject) => {
      let occurrences = 0
      let finder = find(cwd)
      finder.on("file", (file) => {
        if (/package\.json$/.test(file)) {
          fs.readFile(file, (err, contents) => {
            if (err) reject(err)
            let pkg = JSON.parse(contents)
            if (pkg.browser && pkg.browser[mod]) occurrences += 1
          })
        }
      })
      finder.on("end", () => {
        resolve(occurrences)
      })
    })
  }
}

