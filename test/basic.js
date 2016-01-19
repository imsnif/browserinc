import test from 'tape'
import fs from 'fs'
import path from 'path'
import find from 'findit'
import tutils from './utils/test-utils'
import { fork } from 'child_process'

function spawnCmd (cwd) {
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
}

function findOccurrences(mod, cwd) {
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

test("Include excluded files", function(t) {
  let timer = setTimeout(() => {
    t.fail("Extension not created")
  },5000)
  let cwd = path.join(__dirname, "fixtures", "case1")
  tutils.prepareCase(cwd)
    .then(spawnCmd)
    .then(findOccurrences.bind(this, "foo"))
    .then((occurrences) => {
      clearTimeout(timer)
      t.equal(occurrences, 0)
      t.end()
    })
    .catch((reason) => {
      clearTimeout(timer)
      t.fail(reason)
      t.end()
    })
})

test("Across multiple packages", function(t) {
  t.pass()
  t.end()
})

test("Only in specified path", function(t) {
  t.pass()
  t.end()
})

test("Recursive directories", function(t) {
  t.pass()
  t.end()
})
