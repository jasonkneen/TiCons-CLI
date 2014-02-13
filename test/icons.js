var should = require('should'),
  _ = require('underscore'),
  path = require('path'),
  fs = require('fs-extended'),
  ticons = require('../');

var tmpDir = path.join(__dirname, '..', 'tmp');

describe('icons', function() {

  describe('alloy', function() {
    this.timeout(10000);

    before(function() {
      fs.createDir(tmpDir, 0755);
    });

    it('generates expected files', function(done) {

      ticons.icons({
        input: path.join(__dirname, 'icon.png'),
        outputDir: tmpDir,
        alloy: true
      }, function(err, output) {

        if (err) {
          return done(new Error(err));
        }

        output.should.be.eql({
          "ios-appicon-60": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/app/assets/iphone/appicon-60.png",
          "ios-appicon@2x": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/app/assets/iphone/appicon@2x.png",
          "ios-appicon": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/app/assets/iphone/appicon.png",
          "ios-appicon-60@2x": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/app/assets/iphone/appicon-60@2x.png",
          "ios-appicon-72": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/app/assets/iphone/appicon-72.png",
          "ios-appicon-Small": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/app/assets/iphone/appicon-Small.png",
          "ios-appicon-Small@2x": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/app/assets/iphone/appicon-Small@2x.png",
          "ios-appicon-72@2x": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/app/assets/iphone/appicon-72@2x.png",
          "ios-appicon-76": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/app/assets/iphone/appicon-76.png",
          "ios-appicon-Small-40": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/app/assets/iphone/appicon-Small-40.png",
          "ios-appicon-76@2x": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/app/assets/iphone/appicon-76@2x.png",
          "ios-iTunesArtwork": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/app/assets/iphone/iTunesArtwork",
          "android-appicon-ldpi": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/platform/android/res/drawable-ldpi/appicon.png",
          "ios-appicon-Small-40@2x": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/app/assets/iphone/appicon-Small-40@2x.png",
          "ios-appicon-Small-50": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/app/assets/iphone/appicon-Small-50.png",
          "ios-appicon-Small-50@2x": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/app/assets/iphone/appicon-Small-50@2x.png",
          "android-appicon-mdpi": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/platform/android/res/drawable-mdpi/appicon.png",
          "android-appicon": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/app/assets/android/appicon.png",
          "android-appicon-hdpi": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/platform/android/res/drawable-hdpi/appicon.png",
          "android-appicon-xhdpi": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/platform/android/res/drawable-xhdpi/appicon.png",
          "ios-iTunesArtwork@2x": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/app/assets/iphone/iTunesArtwork@2x",
          "tizen-appicon": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/app/assets/tizen/appicon.png",
          "android-appicon-xxhdpi": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/platform/android/res/drawable-xxhdpi/appicon.png",
          "blackberry-appicon": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/app/assets/blackberry/appicon.png",
          "mobileweb-appicon": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/app/assets/mobileweb/appicon.png"
        });

        should(_.every(output, function(output, name) {
          return fs.existsSync(output);
        })).be.true;

        done();

      });

    });

    after(function() {
      //fs.deleteDirSync(tmpDir);
    });

  });

});