'use strict';

var fs = require('fs');
var path = require('path');
var hashFile = require('hash-file');
var walk = require('walk');
var walker;
var files = [];
var hashes = [];
var duplicates = [];

function fileHandler(root, fileStat, next) {
  fs.readFile(path.resolve(root, fileStat.name), function () {
    var file = path.normalize(root + path.sep + fileStat.name);
    var hash = hashFile(file);
    if (hashes.indexOf(hash) !== -1 && duplicates.indexOf(file) === -1) {
      duplicates.push(hash);
    }
    files.push({
      path: file,
      hash: hash
    });
    hashes.push(hash);
    next();
  });
}

function getDuplicates(hash) {
  return files.filter(function (file) {
    return file.hash === hash;
  }).map(function (file) {
    return file.path;
  });
}

function endHandler(cb) {
  for (var i = 0; i < duplicates.length; i++) {
    console.log('\n' + getDuplicates(duplicates[i]).join('\n'));
  }
  if (typeof cb === 'function') {
    cb();
  }
}

module.exports = {
  find: function (path, cb) {
    walker = walk.walk(path, {followLinks: false});
    walker.on("file", fileHandler);
    walker.on("end", endHandler.bind(this, cb));
  }
};