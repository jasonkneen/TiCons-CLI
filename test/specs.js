var should = require('should'),
  _ = require('underscore'),
  path = require('path'),
  specs = require('../lib/specs');

describe('specs', function() {

  describe('#exports', function() {

    it('exist', function() {
      specs.should.be.an.Object;
    });

    it('have a `ios-iTunesArtwork` with right spec', function() {

      specs['ios-iTunesArtwork'].should.be.an.Object;
      specs['ios-iTunesArtwork'].should.be.eql({
        sdkVersion: '<5.0.0',
        type: 'icon',
        path: ':assets:' + path.normalize('/iphone/iTunesArtwork'),
        size: 512,
        platforms: [
          "ios"
        ]
      });
    });

  });

});