var should = require('should'),
  _ = require('underscore'),
  specs = require('../lib/specs');

describe('specs', function() {

  describe('#exports', function() {

    it('exist', function() {
      specs.should.be.an.Object;
    });

    it('Have a property with iTunesArtwork spec', function() {

      specs['ios-iTunesArtwork'].should.be.an.Object;
      specs['ios-iTunesArtwork'].should.be.eql({
        path: 'iphone/iTunesArtwork',
        size: 512,
        dpi: 72,
        "targets": [
          "ios"
        ]
      });
    });

  });

});