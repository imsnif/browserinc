import tmp from 'tmp'
import { ncp } from 'ncp'
import fs from 'fs'

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
  }
}

