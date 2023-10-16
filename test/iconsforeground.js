var should = require('should'),
  _ = require('underscore'),
  path = require('path'),
  fs = require('fs-extended'),
  ticons = require('..');

var tmpDir = path.join(__dirname, '..', 'tmp');

describe('iconsforeground', function() {

  describe('alloy', function() {
    this.timeout(10000);

    beforeEach(function() {
      fs.createDir(tmpDir, 0755);
    });

    it('generates expected files for android-only', function(done) {

      ticons.iconsforeground({
        input: path.join(__dirname, 'icon-foreground.png'),
        minDpi: 120,
        maxDpi: 640,
        outputDir: tmpDir,
        radius: 18,
        alloy: true
      }, function(err, output) {

        if (err) {
          return done(new Error(err));
        }

        _.sortBy(output, _.identity).should.be.eql(_.sortBy({
            "android-appicon-foreground-ldpi": path.join(tmpDir,"/app/platform/android/res/mipmap-ldpi/appicon_foreground.png"),
            "android-appicon-foreground-mdpi": path.join(tmpDir,"/app/platform/android/res/mipmap-mdpi/appicon_foreground.png"),
            "android-appicon-foreground-hdpi": path.join(tmpDir,"/app/platform/android/res/mipmap-hdpi/appicon_foreground.png"),
            "android-appicon-foreground-xhdpi": path.join(tmpDir,"/app/platform/android/res/mipmap-xhdpi/appicon_foreground.png"),
            "android-appicon-foreground-xxhdpi": path.join(tmpDir,"/app/platform/android/res/mipmap-xxhdpi/appicon_foreground.png"),
            "android-appicon-foreground-xxxhdpi": path.join(tmpDir,"/app/platform/android/res/mipmap-xxxhdpi/appicon_foreground.png")
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