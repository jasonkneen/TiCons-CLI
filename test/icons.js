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
          "ios-iTunesConnect": path.join(tmpDir,"/iTunesConnect.png"),
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
          "apple-watch-40x40@2x": path.join(tmpDir,"/apple-watch/40x40@2x.png"),
          "apple-watch-44x44@2x": path.join(tmpDir,"/apple-watch/44x44@2x.png"),
          "apple-watch-86x86@2x": path.join(tmpDir,"/apple-watch/86x86@2x.png"),
          "apple-watch-29x29@2x": path.join(tmpDir,"/apple-watch/29x29@2x.png"),
          "apple-watch-24x24@2x": path.join(tmpDir,"/apple-watch/24x24@2x.png"),
          "apple-watch-98x98@2x": path.join(tmpDir,"/apple-watch/98x98@2x.png"),
          "apple-watch-29x29@3x": path.join(tmpDir,"/apple-watch/29x29@3x.png"),
          "apple-watch-27.5x27.5@2x": path.join(tmpDir,"/apple-watch/27.5x27.5@2x.png"),
          "windows-Logo":path.join(tmpDir,"/app/assets/windows/Logo.png"),
          "windows-SmallLogo":path.join(tmpDir,"/app/assets/windows/SmallLogo.png"),
          "windows-StoreLogo":path.join(tmpDir,"/app/assets/windows/StoreLogo.png")
        }, _.identity));

        should(_.every(output, function(output, name) {
          return fs.existsSync(output);
        })).be.true;

        done();

      });

    });

    after(function() {
      fs.deleteDirSync(tmpDir);
    });

  });

});