#!/usr/bin/env node

import fs from 'fs'
import ReadPkg from './read-pkg'
import AdjustBrowserField from './adjust-browser-field'
import WriteChanges from './write-changes'

function getPkgFromDir(dir) {
  fs.readdir(dir, (err, files) => {
    if (err) throw err
    files.forEach((file) => {
      if (file === "package.json") return readPkg.write(`${dir}/${file}`)
      fs.stat(`${dir}/${file}`, (err, stats) => {
        if (err) throw err
        if (stats.isDirectory()) getPkgFromDir(`${dir}/${file}`)
      })
    })
  })
}

let buf = fs.readFileSync(`${process.cwd()}/package.json`)
let pkg = JSON.parse(buf.toString())
if (!pkg.browserinc.include) 
  throw new Error("Could not find include list in package.json")
let readPkg = new ReadPkg()
let adjustBf = new AdjustBrowserField(pkg.browserinc.include)
let writeChanges = new WriteChanges
readPkg.pipe(adjustBf).pipe(writeChanges)
getPkgFromDir(`${process.cwd()}/node_modules`)
