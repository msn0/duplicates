'use strict';

var path = require('path');
var hashFile = require('hash-file');
var walk = require('walk');
var walker, files = [], hashes = [], duplicates = [];

function fileHandler(root, fileStat, next) {
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
}

function getDuplicates(hash) {
  return files.filter(function (file) {
    return file.hash === hash;
  }).map(function (file) {
    return file.path;
  });
}

function endHandler(cb) {
  var temp = {};
  duplicates.forEach(function (file) {
    temp[file] = getDuplicates(file);
  });

  if (typeof cb === 'function') {
    cb(temp);
  }
}

module.exports = {
  find: function (path, cb) {
    var options = {
      followLinks: false,
      listeners: {
        file: fileHandler,
        end: endHandler.bind(this, cb)
      }
    };
    walker = walk.walkSync(path, options);
  }
};
