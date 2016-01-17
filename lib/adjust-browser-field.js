import { Transform } from 'stream'

export default class AdjustBrowserField extends Transform {
  constructor(removes, options={objectMode: true}) {
    super(options)
    this._removes = removes
  }
  _transform(entry, err, cb) {
    // entry: { filename: <absoluteFilePath>, parsed: <parsedJson> }
    if (entry.parsed && entry.parsed.browser) {
      let changed = false
      Object.keys(entry.parsed.browser).forEach((key) => {
        if (this._removes.indexOf(key) !== -1) {
          delete entry.parsed.browser[key]
          changed = true
        }
      })
      if (changed === true) this.push(entry)
    }
    cb()
  }
}
