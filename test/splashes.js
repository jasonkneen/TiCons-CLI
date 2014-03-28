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
        outputDir: tmpDir,
        alloy: true
      }, function(err, output) {

        if (err) {
          return done(new Error(err));
        }

        _.sortBy(output, _.identity).should.be.eql(_.sortBy({
          "ios-Default": path.resolve(tmpDir + "/app/assets/iphone/Default.png"),
          "ios-Default@2x": path.resolve(tmpDir + "/app/assets/iphone/Default@2x.png"),
          "ios-Default-568h@2x": path.resolve(tmpDir + "/app/assets/iphone/Default-568h@2x.png"),
          "ios-Default-Portrait": path.resolve(tmpDir + "/app/assets/iphone/Default-Portrait.png"),
          "ios-Default-Portrait@2x": path.resolve(tmpDir + "/app/assets/iphone/Default-Portrait@2x.png"),
          "ios-Default-Landscape": path.resolve(tmpDir + "/app/assets/iphone/Default-Landscape.png"),
          "ios-Default-Landscape@2x": path.resolve(tmpDir + "/app/assets/iphone/Default-Landscape@2x.png"),
          "android-default-notlong-land-ldpi": path.resolve(tmpDir + "/platform/android/res/drawable-land-ldpi/splash.9.png"),
          "mobileweb-Default-jpg": path.resolve(tmpDir + "/app/assets/mobileweb/apple_startup_images/Default.jpg"),
          "android-default-notlong-land-mdpi": path.resolve(tmpDir + "/platform/android/res/drawable-land-mdpi/splash.9.png"),
          "android-default-notlong-port-ldpi": path.resolve(tmpDir + "/platform/android/res/drawable-port-ldpi/splash.9.png"),
          "mobileweb-Default-Portrait-jpg": path.resolve(tmpDir + "/app/assets/mobileweb/apple_startup_images/Default-Portrait.jpg"),
          "mobileweb-Default-Landscape-jpg": path.resolve(tmpDir + "/app/assets/mobileweb/apple_startup_images/Default-Landscape.jpg"),
          "android-default-notlong-land-hdpi": path.resolve(tmpDir + "/platform/android/res/drawable-land-hdpi/splash.9.png"),
          "android-default-notlong-port-mdpi": path.resolve(tmpDir + "/platform/android/res/drawable-port-mdpi/splash.9.png"),
          "mobileweb-Default-png": path.resolve(tmpDir + "/app/assets/mobileweb/apple_startup_images/Default.png"),
          "android-default-notlong-land-xhdpi": path.resolve(tmpDir + "/platform/android/res/drawable-land-xhdpi/splash.9.png"),
          "android-default-notlong-land-xxhdpi": path.resolve(tmpDir + "/platform/android/res/drawable-land-xxhdpi/splash.9.png"),
          "android-default-notlong-port-hdpi": path.resolve(tmpDir + "/platform/android/res/drawable-port-hdpi/splash.9.png"),
          "android-default-notlong-port-xhdpi": path.resolve(tmpDir + "/platform/android/res/drawable-port-xhdpi/splash.9.png"),
          "android-default-notlong-port-xxhdpi": path.resolve(tmpDir + "/platform/android/res/drawable-port-xxhdpi/splash.9.png"),
          "blackberry-splash-600x1024": path.resolve(tmpDir + "/app/assets/blackberry/splash-600x1024.png"),
          "blackberry-splash-720x720": path.resolve(tmpDir + "/app/assets/blackberry/splash-720x720.png"),
          "blackberry-splash-768x1280": path.resolve(tmpDir + "/app/assets/blackberry/splash-768x1280.png"),
          "mobileweb-Default-Portrait-png": path.resolve(tmpDir + "/app/assets/mobileweb/apple_startup_images/Default-Portrait.png"),
          "mobileweb-Default-Landscape-png": path.resolve(tmpDir + "/app/assets/mobileweb/apple_startup_images/Default-Landscape.png")
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