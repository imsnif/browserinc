#!/usr/bin/env node

import fs from 'fs'
import find from 'findit'
import path from 'path'
import ReadPkg from './read-pkg'
import AdjustBrowserField from './adjust-browser-field'
import WriteChanges from './write-changes'

let buf = fs.readFileSync(`${process.cwd()}/package.json`)
let pkg = JSON.parse(buf.toString())
if (!pkg.browserinc.include) 
  throw new Error("Could not find include list in package.json")

let readPkg      = new ReadPkg()
let adjustBf     = new AdjustBrowserField(pkg.browserinc.include)
let writeChanges = new WriteChanges

readPkg.pipe(adjustBf).pipe(writeChanges)

let finder = find(path.join(process.cwd(), "node_modules"))

finder.on("file", (file) => {
  if (/package\.json$/.test(file)) {
    readPkg.write(file)
  }
})
