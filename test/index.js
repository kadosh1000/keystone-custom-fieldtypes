var expect = require('chai').expect;

describe('#requiring', function() {
  it('requires the main module', function() {
    kcf = require('../index');
    expect(kcf).to.exist;
  });

  it('Have loadFromDir function', function() {
    kcf = require('../index');
    expect(kcf).to.have.property('loadFromDir').that.is.a('function');
  });
});