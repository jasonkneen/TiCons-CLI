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

        output.should.be.eql({
          "ios-Default": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/app/assets/iphone/Default.png",
          "ios-Default@2x": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/app/assets/iphone/Default@2x.png",
          "ios-Default-568h@2x": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/app/assets/iphone/Default-568h@2x.png",
          "ios-Default-Portrait": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/app/assets/iphone/Default-Portrait.png",
          "ios-Default-Portrait@2x": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/app/assets/iphone/Default-Portrait@2x.png",
          "ios-Default-Landscape": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/app/assets/iphone/Default-Landscape.png",
          "ios-Default-Landscape@2x": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/app/assets/iphone/Default-Landscape@2x.png",
          "android-default-notlong-land-ldpi": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/platform/android/res/drawable-land-ldpi/splash.9.png",
          "mobileweb-Default-jpg": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/app/assets/mobileweb/apple_startup_images/Default.jpg",
          "android-default-notlong-land-mdpi": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/platform/android/res/drawable-land-mdpi/splash.9.png",
          "android-default-notlong-port-ldpi": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/platform/android/res/drawable-port-ldpi/splash.9.png",
          "mobileweb-Default-Portrait-jpg": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/app/assets/mobileweb/apple_startup_images/Default-Portrait.jpg",
          "mobileweb-Default-Landscape-jpg": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/app/assets/mobileweb/apple_startup_images/Default-Landscape.jpg",
          "android-default-notlong-land-hdpi": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/platform/android/res/drawable-land-hdpi/splash.9.png",
          "android-default-notlong-port-mdpi": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/platform/android/res/drawable-port-mdpi/splash.9.png",
          "mobileweb-Default-png": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/app/assets/mobileweb/apple_startup_images/Default.png",
          "android-default-notlong-land-xhdpi": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/platform/android/res/drawable-land-xhdpi/splash.9.png",
          "android-default-notlong-port-hdpi": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/platform/android/res/drawable-port-hdpi/splash.9.png",
          "android-default-notlong-port-xhdpi": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/platform/android/res/drawable-port-xhdpi/splash.9.png",
          "blackberry-splash-600x1024": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/app/assets/blackberry/splash-600x1024.png",
          "mobileweb-Default-Portrait-png": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/app/assets/mobileweb/apple_startup_images/Default-Portrait.png",
          "mobileweb-Default-Landscape-png": "/Users/zandbergen/dev/projects/TiCons-CLI/tmp/app/assets/mobileweb/apple_startup_images/Default-Landscape.png"
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