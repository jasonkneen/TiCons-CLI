var should = require('should'),
  _ = require('underscore'),
  path = require('path'),
  fs = require('fs-extended'),
  ticons = require('../');

var tmpDir = path.join(__dirname, '..', 'tmp');

describe('logos', function() {

  describe('alloy', function() {
    this.timeout(10000);

    beforeEach(function() {
      fs.createDir(tmpDir, 0755);
    });

    it('generates expected files', function(done) {

      ticons.logos({
        input: path.join(__dirname, 'icon.png'),
        outputDir: tmpDir,
        alloy: true,
        sdkVersion: '5.2.0'
      }, function(err, output) {

        if (err) {
          return done(new Error(err));
        }

        _.sortBy(output, _.identity).should.be.eql(_.sortBy({
          "LaunchLogo~iphone": path.join(tmpDir,"/app/assets/iphone/LaunchLogo~iphone.png"),
          "LaunchLogo@2x~iphone": path.join(tmpDir,"/app/assets/iphone/LaunchLogo@2x~iphone.png"),
          "LaunchLogo@3x~iphone": path.join(tmpDir,"/app/assets/iphone/LaunchLogo@3x~iphone.png"),
          "LaunchLogo~ipad": path.join(tmpDir,"/app/assets/iphone/LaunchLogo~ipad.png"),
          "LaunchLogo@2x~ipad": path.join(tmpDir,"/app/assets/iphone/LaunchLogo@2x~ipad.png")
        }, _.identity));

        should(_.every(output, function(output, name) {
          return fs.existsSync(output);
        })).be.true;

        done();

      });

    });

    afterEach(function() {
      fs.deleteDirSync(tmpDir);
    });

  });

});
