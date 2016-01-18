import { Transform } from 'stream'

export default class AdjustBrowserField extends Transform {
  constructor(include, options={objectMode: true}) {
    super(options)
    this._include = include 
  }
  _transform(entry, err, cb) {
    // entry: { filename: <absoluteFilePath>, parsed: <parsedJson> }
    if (entry.parsed && entry.parsed.browser) {
      let changed = false
      Object.keys(entry.parsed.browser).forEach((key) => {
        if (this._include.indexOf(key) !== -1) {
          delete entry.parsed.browser[key]
          changed = true
        }
      })
      if (changed === true) this.push(entry)
    }
    cb()
  }
}
