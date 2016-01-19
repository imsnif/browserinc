import test   from 'tape'
import path   from 'path'
import tutils from './utils/test-utils'

test("Include excluded files", function(t) {
  let timer = setTimeout(() => {
    t.fail("Not replaced")
  },5000)
  let cwd = path.join(__dirname, "fixtures", "case1")
  tutils.prepareCase(cwd)
    .then(tutils.spawnCmd)
    .then(tutils.findOccurrences.bind(this, "foo"))
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
