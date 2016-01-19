import fs from 'fs'
import temp from 'temp'
import path from 'path'

function createPkgJson(pkg, pkgPath) {
  return new Promise((resolve, reject) => {
    console.log("making:", path.join(pkgPath, pkg))
    temp.mkdir(path.join(pkgPath, pkg), (err, dirPath) => {
      let filePath = path.join(dirPath, "package.json")
      fs.writeFile(filePath, "{}", (err) => {
        if (err) reject(err)
        resolve()
      })
    })
  })
}

function buildDirStructure(dirStructure, dirPath) {
  let promises = []
  dirPath = dirPath || ""
  Object.keys(dirStructure).forEach((pkg) => {
    promises.push(createPkgJson(pkg, dirPath))
    if (Object.keys(dirStructure[pkg] > 1)) {
      promises.push(buildDirStructure(dirStructure[pkg], path.join(dirPath, pkg)))
    }
  })
  return Promise.all(promises)
}

export default class Fixtures {
  constructor(includes) {
    this._includes = includes 
  }
  create(dirStructure) {
    return buildDirStructure(dirStructure)
  }
}
