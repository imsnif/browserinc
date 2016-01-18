#!/usr/bin/env node
'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _readPkg = require('./read-pkg');

var _readPkg2 = _interopRequireDefault(_readPkg);

var _adjustBrowserField = require('./adjust-browser-field');

var _adjustBrowserField2 = _interopRequireDefault(_adjustBrowserField);

var _writeChanges = require('./write-changes');

var _writeChanges2 = _interopRequireDefault(_writeChanges);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getPkgFromDir(dir) {
  _fs2.default.readdir(dir, function (err, files) {
    if (err) throw err;
    files.forEach(function (file) {
      if (file === "package.json") return readPkg.write(dir + '/' + file);
      _fs2.default.stat(dir + '/' + file, function (err, stats) {
        if (err) throw err;
        if (stats.isDirectory()) getPkgFromDir(dir + '/' + file);
      });
    });
  });
}

var buf = _fs2.default.readFileSync(process.cwd() + '/package.json');
var pkg = JSON.parse(buf.toString());
if (!pkg.browserinc.include) throw new Error("Could not find include list in package.json");
var readPkg = new _readPkg2.default();
var adjustBf = new _adjustBrowserField2.default(pkg.browserinc.include);
var writeChanges = new _writeChanges2.default();
readPkg.pipe(adjustBf).pipe(writeChanges);
getPkgFromDir(process.cwd() + '/node_modules');