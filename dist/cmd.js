#!/usr/bin/env node
'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _findit = require('findit');

var _findit2 = _interopRequireDefault(_findit);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _readPkg = require('./read-pkg');

var _readPkg2 = _interopRequireDefault(_readPkg);

var _adjustBrowserField = require('./adjust-browser-field');

var _adjustBrowserField2 = _interopRequireDefault(_adjustBrowserField);

var _writeChanges = require('./write-changes');

var _writeChanges2 = _interopRequireDefault(_writeChanges);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buf = _fs2.default.readFileSync(process.cwd() + '/package.json');
var pkg = JSON.parse(buf.toString());
if (!pkg.browserinc.include) throw new Error("Could not find include list in package.json");

var readPkg = new _readPkg2.default();
var adjustBf = new _adjustBrowserField2.default(pkg.browserinc.include);
var writeChanges = new _writeChanges2.default();

readPkg.pipe(adjustBf).pipe(writeChanges);

var finder = (0, _findit2.default)(_path2.default.join(process.cwd(), "node_modules"));

finder.on("file", function (file) {
  if (/package\.json$/.test(file)) {
    readPkg.write(file);
  }
});