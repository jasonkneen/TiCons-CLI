var should = require('should'),
  _ = require('underscore'),
  path = require('path'),
  fs = require('fs-extended'),
  ticons = require('../');
constants = require('../lib/constants');

var PATH_TMP = path.join(__dirname, '..', 'tmp');
var PATH_ASSET_FROM = path.join(__dirname, 'asset.png');
var PATH_ASSET_TO = path.join(PATH_TMP, 'Resources', 'android', 'images', 'res-xxxhdpi', 'asset.png');

describe('assets', function() {

  describe('origDpi', function() {
    this.timeout(20000);

    it('generates expected files', function(done) {

      ticons.assets({
        input: PATH_ASSET_FROM,
        minDpi: constants.dpi.ldpi,
        origDpi: constants.dpi.xxxhdpi,
        outputDir: path.join(PATH_TMP, 'assets')
      }, function(err, output) {

        if (err) {
          return done(new Error(err));
        }

        output.should.eql([
          PATH_TMP + '/assets/iphone/images/asset@3x.png',
          PATH_TMP + '/assets/iphone/images/asset@2x.png',
          PATH_TMP + '/assets/images/asset.png',
          PATH_TMP + '/assets/android/images/res-xxxhdpi/asset.png',
          PATH_TMP + '/assets/android/images/res-xxhdpi/asset.png',
          PATH_TMP + '/assets/android/images/res-xhdpi/asset.png',
          PATH_TMP + '/assets/android/images/res-hdpi/asset.png',
          PATH_TMP + '/assets/android/images/res-ldpi/asset.png'
        ]);

        should(_.every(output, function(output, name) {
          return fs.existsSync(output);
        })).be.true;

        done();

      });

    });

    after(function() {
      fs.deleteDirSync(PATH_TMP);
    });

  });

  describe('main', function() {
    this.timeout(20000);

    before(function() {
      fs.copyFileSync(PATH_ASSET_FROM, PATH_ASSET_TO);
    });

    it('generates expected files', function(done) {

      ticons.assets({
        input: PATH_ASSET_TO,
        outputDir: PATH_TMP
      }, function(err, output) {

        if (err) {
          return done(new Error(err));
        }

        output.should.eql([
          PATH_TMP + '/Resources/iphone/images/asset@3x.png',
          PATH_TMP + '/Resources/iphone/images/asset@2x.png',
          PATH_TMP + '/Resources/images/asset.png',
          PATH_TMP + '/Resources/android/images/res-xxhdpi/asset.png',
          PATH_TMP + '/Resources/android/images/res-xhdpi/asset.png',
          PATH_TMP + '/Resources/android/images/res-hdpi/asset.png'
        ]);

        should(_.every(output, function(output, name) {
          return fs.existsSync(output);
        })).be.true;

        done();

      });

    });

    after(function() {
      fs.deleteDirSync(PATH_TMP);
    });

  });

});
