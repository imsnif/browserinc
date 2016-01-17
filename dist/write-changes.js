'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stream = require('stream');

var _fs = require('fs');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WriteChanges = function (_Transform) {
  _inherits(WriteChanges, _Transform);

  function WriteChanges() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? { objectMode: true } : arguments[0];

    _classCallCheck(this, WriteChanges);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(WriteChanges).call(this, options));
  }

  _createClass(WriteChanges, [{
    key: '_transform',
    value: function _transform(entry, err, cb) {
      // entry: { filename: <absoluteFilePath>, parsed: <parsedJson> }
      (0, _fs.writeFile)(entry.filename, JSON.stringify(entry.parsed, null, 2), function (err) {
        if (err) throw err;
        cb();
      });
    }
  }]);

  return WriteChanges;
}(_stream.Transform);

exports.default = WriteChanges;