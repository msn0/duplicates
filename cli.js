#!/usr/bin/env node
'use strict';
var meow = require('meow');
var duplicates = require('./');

var cli = meow({
  help: [
    'Usage',
    '  duplicates <path>',
    '',
    'Example',
    '  duplicates /home/michal/Pictures'
  ].join('\n')
});

var path = cli.input[0];

if (!path) {
  console.error('Please supply path');
  process.exit(1);
}

duplicates.find(path, function (data) {
  console.log(data);
});