import { Transform } from 'stream'
import { writeFile } from 'fs'

export default class WriteChanges extends Transform {
  constructor(options={objectMode: true}) {
    super(options)
  }
  _transform(entry, err, cb) {
    // entry: { filename: <absoluteFilePath>, parsed: <parsedJson> }
    writeFile(entry.filename, JSON.stringify(entry.parsed, null, 2), (err) => {
      if (err) throw err
      cb()
    })
  }
}
