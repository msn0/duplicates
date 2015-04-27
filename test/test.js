'use strict';

var assert = require('assert');
var sinon = require('sinon');
var duplicates = require('../');

describe('Finding duplicates', function () {
  it('should return expected result', function () {
    var spy = sinon.spy();
    duplicates.find("./test/fixtures", spy);
    assert(spy.calledWith({
      e9b286d11c6f6d1be4c2dcf0fee964c1fdb0a8e2: [ 'test/fixtures/file1', 'test/fixtures/file1.duplicate' ],
      d407089473b567eb5543aa25c0c8a4c121d7c421: [ 'test/fixtures/file3', 'test/fixtures/file3.dup' ]
    }));
  });
});

