var should = require('should'),
  _ = require('underscore'),
  path = require('path'),
  fs = require('fs-extended'),
  ticons = require('../');

var tmpDir = path.join(__dirname, '..', 'tmp');

describe('splashes', function() {

  describe('alloy', function() {
    this.timeout(20000);

    before(function() {
      fs.createDir(tmpDir, 0755);
    });

    it('generates expected files', function(done) {

      ticons.splashes({
        input: path.join(__dirname, 'splash.png'),
        minDpi: 120,
        maxDpi: 640,
        outputDir: tmpDir,
        alloy: true
      }, function(err, output) {

        if (err) {
          return done(new Error(err));
        }

        _.sortBy(output, _.identity).should.be.eql(_.sortBy({
          "android-MarketplaceArtworkFeature": path.join(tmpDir,"/MarketplaceArtworkFeature.png"),
          "ios-Default@2x": path.join(tmpDir,"/app/assets/iphone/Default@2x.png"),
          "ios-Default-568h@2x": path.join(tmpDir,"/app/assets/iphone/Default-568h@2x.png"),
          "ios-Default-Landscape-736h@3x": path.join(tmpDir,"/app/assets/iphone/Default-Landscape-736h@3x.png"),
          "ios-Default-Portrait-736h@3x": path.join(tmpDir,"/app/assets/iphone/Default-Portrait-736h@3x.png"),
          "ios-Default-667h@2x": path.join(tmpDir,"/app/assets/iphone/Default-667h@2x.png"),
          "ios-Default-Portrait": path.join(tmpDir,"/app/assets/iphone/Default-Portrait.png"),
          "ios-Default-Portrait@2x": path.join(tmpDir,"/app/assets/iphone/Default-Portrait@2x.png"),
          "ios-Default-Landscape": path.join(tmpDir,"/app/assets/iphone/Default-Landscape.png"),
          "ios-Default-Landscape@2x": path.join(tmpDir,"/app/assets/iphone/Default-Landscape@2x.png"),
          "mobileweb-Default-jpg": path.join(tmpDir,"/app/assets/mobileweb/apple_startup_images/Default.jpg"),
          "android-default-notlong-port-ldpi": path.join(tmpDir,"/platform/android/res/drawable-ldpi/background.9.png"),
          "mobileweb-Default-Portrait-jpg": path.join(tmpDir,"/app/assets/mobileweb/apple_startup_images/Default-Portrait.jpg"),
          "mobileweb-Default-Landscape-jpg": path.join(tmpDir,"/app/assets/mobileweb/apple_startup_images/Default-Landscape.jpg"),
          "android-default-notlong-port-mdpi": path.join(tmpDir,"/platform/android/res/drawable-mdpi/background.9.png"),
          "mobileweb-Default-png": path.join(tmpDir,"/app/assets/mobileweb/apple_startup_images/Default.png"),
          "android-default-notlong-port-hdpi": path.join(tmpDir,"/platform/android/res/drawable-hdpi/background.9.png"),
          "android-default-notlong-port-xhdpi": path.join(tmpDir,"/platform/android/res/drawable-xhdpi/background.9.png"),
          "android-default-notlong-port-xxhdpi": path.join(tmpDir,"/platform/android/res/drawable-xxhdpi/background.9.png"),
          "android-default-notlong-port-xxxhdpi": path.join(tmpDir,"/platform/android/res/drawable-xxxhdpi/background.9.png"),
          "blackberry-splash-600x1024": path.join(tmpDir,"/app/assets/blackberry/splash-600x1024.png"),
          "blackberry-splash-720x720": path.join(tmpDir,"/app/assets/blackberry/splash-720x720.png"),
          "blackberry-splash-768x1280": path.join(tmpDir,"/app/assets/blackberry/splash-768x1280.png"),
          "mobileweb-Default-Portrait-png": path.join(tmpDir,"/app/assets/mobileweb/apple_startup_images/Default-Portrait.png"),
          "mobileweb-Default-Landscape-png": path.join(tmpDir,"/app/assets/mobileweb/apple_startup_images/Default-Landscape.png"),
          "windows-SplashScreen": path.join(tmpDir,"/app/assets/windows/SplashScreen.png"),
          "windows-SplashScreen.scale-240": path.join(tmpDir,"/app/assets/windows/SplashScreen.scale-240.png")
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