import { Transform } from 'stream'
import { readFile } from 'fs'

export default class ReadPkg extends Transform {
  constructor(options={objectMode: true}) {
    super(options)
  }
  _transform(filename, err, cb) {
    readFile(filename, (err, buf) => {
      if (err) throw (err)
      this.push({filename, parsed: JSON.parse(buf.toString())})
      cb()
    })
  }
}
