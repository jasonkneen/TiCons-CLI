var should = require('should'),
  _ = require('underscore'),
  path = require('path'),
  fs = require('fs-extended'),
  ticons = require('../');

var tmpDir = path.join(__dirname, '..', 'tmp');

describe('icons', function() {

  describe('alloy', function() {
    this.timeout(10000);

    beforeEach(function() {
      fs.createDir(tmpDir, 0755);
    });

    it('generates expected files', function(done) {

      ticons.icons({
        input: path.join(__dirname, 'icon.png'),
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
          "DefaultIcon": path.join(tmpDir,"/DefaultIcon.png"),
          "android-MarketplaceArtwork": path.join(tmpDir,"/MarketplaceArtwork.png"),
          "android-appicon-ldpi": path.join(tmpDir,"/app/platform/android/res/drawable-ldpi/appicon.png"),
          "android-appicon-mdpi": path.join(tmpDir,"/app/platform/android/res/drawable-mdpi/appicon.png"),
          "android-appicon": path.join(tmpDir,"/app/assets/android/appicon.png"),
          "android-appicon-hdpi": path.join(tmpDir,"/app/platform/android/res/drawable-hdpi/appicon.png"),
          "android-appicon-xxxhdpi": path.join(tmpDir,"/app/platform/android/res/drawable-xxxhdpi/appicon.png"),
          "tizen-appicon": path.join(tmpDir,"/app/assets/tizen/appicon.png"),
          "android-appicon-xxhdpi": path.join(tmpDir,"/app/platform/android/res/drawable-xxhdpi/appicon.png"),
          "android-appicon-xhdpi": path.join(tmpDir,"/app/platform/android/res/drawable-xhdpi/appicon.png"),
          "blackberry-appicon": path.join(tmpDir,"/app/assets/blackberry/appicon.png"),
          "mobileweb-appicon": path.join(tmpDir,"/app/assets/mobileweb/appicon.png"),
          "apple-watch-icon-24@2x.png": path.join(tmpDir,"/apple-watch/icon-24@2x.png"),
          "apple-watch-icon-27.5@2x.png": path.join(tmpDir,"/apple-watch/icon-27.5@2x.png"),
          "apple-watch-icon-29@2x.png": path.join(tmpDir,"/apple-watch/icon-29@2x.png"),
          "apple-watch-icon-29@3x.png": path.join(tmpDir,"/apple-watch/icon-29@3x.png"),
          "apple-watch-icon-40@2x.png": path.join(tmpDir,"/apple-watch/icon-40@2x.png"),
          "apple-watch-icon-44@2x.png": path.join(tmpDir,"/apple-watch/icon-44@2x.png"),
          "apple-watch-icon-86@2x.png": path.join(tmpDir,"/apple-watch/icon-86@2x.png"),
          "apple-watch-icon-98@2x.png": path.join(tmpDir,"/apple-watch/icon-98@2x.png")
        }, _.identity));

        should(_.every(output, function(output, name) {
          return fs.existsSync(output);
        })).be.true;

        done();

      });

    });

    it('generates expected files for ios-only', function(done) {

      ticons.icons({
        input: path.join(__dirname, 'icon.png'),
        minDpi: 120,
        maxDpi: 640,
        outputDir: tmpDir,
        platforms: ['ios'],
        radius: 18,
        alloy: true
      }, function(err, output) {

        if (err) {
          return done(new Error(err));
        }

        _.sortBy(output, _.identity).should.be.eql(_.sortBy({
          "DefaultIcon-ios": path.join(tmpDir,"/DefaultIcon-ios.png")
        }, _.identity));

        should(_.every(output, function(output, name) {
          return fs.existsSync(output);
        })).be.true;

        done();

      });

    });

    it('generates expected files for 4.0.0', function(done) {

      ticons.icons({
        input: path.join(__dirname, 'icon.png'),
        minDpi: 120,
        maxDpi: 640,
        outputDir: tmpDir,
        sdkVersion: '4.0.0',
        radius: 18,
        alloy: true
      }, function(err, output) {

        if (err) {
          return done(new Error(err));
        }

        _.sortBy(output, _.identity).should.be.eql(_.sortBy({
          "DefaultIcon": path.join(tmpDir,"/DefaultIcon.png"),
          "ios-appicon-60": path.join(tmpDir,"/app/assets/iphone/appicon-60.png"),
          "ios-appicon@2x": path.join(tmpDir,"/app/assets/iphone/appicon@2x.png"),
          "ios-appicon": path.join(tmpDir,"/app/assets/iphone/appicon.png"),
          "ios-appicon-60@2x": path.join(tmpDir,"/app/assets/iphone/appicon-60@2x.png"),
          "ios-appicon-60@3x": path.join(tmpDir,"/app/assets/iphone/appicon-60@3x.png"),
          "ios-appicon-72": path.join(tmpDir,"/app/assets/iphone/appicon-72.png"),
          "ios-appicon-Small": path.join(tmpDir,"/app/assets/iphone/appicon-Small.png"),
          "ios-appicon-Small@2x": path.join(tmpDir,"/app/assets/iphone/appicon-Small@2x.png"),
          "ios-appicon-Small@3x": path.join(tmpDir,"/app/assets/iphone/appicon-Small@3x.png"),
          "ios-appicon-72@2x": path.join(tmpDir,"/app/assets/iphone/appicon-72@2x.png"),
          "ios-appicon-76": path.join(tmpDir,"/app/assets/iphone/appicon-76.png"),
          "ios-appicon-Small-40": path.join(tmpDir,"/app/assets/iphone/appicon-Small-40.png"),
          "ios-appicon-76@2x": path.join(tmpDir,"/app/assets/iphone/appicon-76@2x.png"),
          "ios-appicon-83.5@2x": path.join(tmpDir,"/app/assets/iphone/appicon-83.5@2x.png"),
          "ios-iTunesArtwork": path.join(tmpDir,"/app/assets/iphone/iTunesArtwork"),
          "android-MarketplaceArtwork": path.join(tmpDir,"/MarketplaceArtwork.png"),
          "android-appicon-ldpi": path.join(tmpDir,"/platform/android/res/drawable-ldpi/appicon.png"),
          "ios-appicon-Small-40@2x": path.join(tmpDir,"/app/assets/iphone/appicon-Small-40@2x.png"),
          "ios-appicon-Small-50": path.join(tmpDir,"/app/assets/iphone/appicon-Small-50.png"),
          "ios-appicon-Small-50@2x": path.join(tmpDir,"/app/assets/iphone/appicon-Small-50@2x.png"),
          "android-appicon-mdpi": path.join(tmpDir,"/platform/android/res/drawable-mdpi/appicon.png"),
          "android-appicon": path.join(tmpDir,"/app/assets/android/appicon.png"),
          "android-appicon-hdpi": path.join(tmpDir,"/platform/android/res/drawable-hdpi/appicon.png"),
          "android-appicon-xxxhdpi": path.join(tmpDir,"/platform/android/res/drawable-xxxhdpi/appicon.png"),
          "ios-iTunesArtwork@2x": path.join(tmpDir,"/app/assets/iphone/iTunesArtwork@2x"),
          "tizen-appicon": path.join(tmpDir,"/app/assets/tizen/appicon.png"),
          "android-appicon-xxhdpi": path.join(tmpDir,"/platform/android/res/drawable-xxhdpi/appicon.png"),
          "android-appicon-xhdpi": path.join(tmpDir,"/platform/android/res/drawable-xhdpi/appicon.png"),
          "blackberry-appicon": path.join(tmpDir,"/app/assets/blackberry/appicon.png"),
          "mobileweb-appicon": path.join(tmpDir,"/app/assets/mobileweb/appicon.png"),
          "apple-watch-icon-24@2x.png": path.join(tmpDir,"/apple-watch/icon-24@2x.png"),
          "apple-watch-icon-27.5@2x.png": path.join(tmpDir,"/apple-watch/icon-27.5@2x.png"),
          "apple-watch-icon-29@2x.png": path.join(tmpDir,"/apple-watch/icon-29@2x.png"),
          "apple-watch-icon-29@3x.png": path.join(tmpDir,"/apple-watch/icon-29@3x.png"),
          "apple-watch-icon-40@2x.png": path.join(tmpDir,"/apple-watch/icon-40@2x.png"),
          "apple-watch-icon-44@2x.png": path.join(tmpDir,"/apple-watch/icon-44@2x.png"),
          "apple-watch-icon-86@2x.png": path.join(tmpDir,"/apple-watch/icon-86@2x.png"),
          "apple-watch-icon-98@2x.png": path.join(tmpDir,"/apple-watch/icon-98@2x.png"),
          "windows-appicon":path.join(tmpDir,"/app/assets/windows/appicon.png"),
          "windows-Square44x44Logo":path.join(tmpDir,"/app/assets/windows/Square44x44Logo.png"),
          "windows-Square71x71Logo":path.join(tmpDir,"/app/assets/windows/Square71x71Logo.png"),
          "windows-Square150x150Logo":path.join(tmpDir,"/app/assets/windows/Square150x150Logo.png"),
          "windows-Logo":path.join(tmpDir,"/app/assets/windows/Logo.png"),
          "windows-StoreLogo":path.join(tmpDir,"/app/assets/windows/StoreLogo.png"),
          "windows-SmallLogo":path.join(tmpDir,"/app/assets/windows/SmallLogo.png")
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