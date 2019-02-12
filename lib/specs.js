// jscs:disable jsDoc
'use strict';

var path = require('path'),
  constants = require('./constants');

exports.DefaultIcon = {
  type: 'icon',
  path: path.join('DefaultIcon.png'),
  size: 1024,
  platforms: ['ios', 'windows']
};

/**
 * iOS
 */

// DefaultIcon
exports['ios-DefaultIcon'] = {
  type: 'icon',
  path: path.join('DefaultIcon-ios.png'),
  size: 1024,
  platforms: ['ios']
};

// iTunes Artwork
exports['ios-iTunesArtwork'] = {
  type: 'icon',
  path: path.join(':assets:', 'iphone', 'iTunesArtwork'),
  size: 512,
  platforms: ['ios'],
  sdkVersion: '<5.0.0'
};
exports['ios-iTunesArtwork@2x'] = {
  type: 'icon',
  path: path.join(':assets:', 'iphone', 'iTunesArtwork@2x'),
  size: 1024,
  platforms: ['ios'],
  sdkVersion: '<5.0.0'
};

// App icons
exports['ios-appicon'] = {
  type: 'icon',
  path: path.join(':assets:', 'iphone', 'appicon.png'),
  size: 57,
  platforms: ['iphone', 'ios'],
  sdkVersion: '<5.0.0'
};
exports['ios-appicon@2x'] = {
  type: 'icon',
  path: path.join(':assets:', 'iphone', 'appicon@2x.png'),
  size: 114,
  platforms: ['iphone'],
  maxVersion: 6,
  sdkVersion: '<5.0.0'
};
exports['ios-appicon-60'] = {
  type: 'icon',
  path: path.join(':assets:', 'iphone', 'appicon-60.png'),
  size: 60,
  platforms: ['iphone'],
  minVersion: 7,
  sdkVersion: '<5.0.0'
};
exports['ios-appicon-60@2x'] = {
  type: 'icon',
  path: path.join(':assets:', 'iphone', 'appicon-60@2x.png'),
  size: 120,
  platforms: ['iphone'],
  minVersion: 7,
  sdkVersion: '<5.0.0'
};
exports['ios-appicon-60@3x'] = {
  type: 'icon',
  path: path.join(':assets:', 'iphone', 'appicon-60@3x.png'),
  size: 180,
  platforms: ['iphone'],
  minVersion: 8,
  sdkVersion: '<5.0.0'
};
exports['ios-appicon-72'] = {
  type: 'icon',
  path: path.join(':assets:', 'iphone', 'appicon-72.png'),
  size: 72,
  platforms: ['ipad'],
  maxVersion: 6,
  sdkVersion: '<5.0.0'
};
exports['ios-appicon-72@2x'] = {
  type: 'icon',
  path: path.join(':assets:', 'iphone', 'appicon-72@2x.png'),
  size: 144,
  platforms: ['ipad'],
  maxVersion: 6,
  sdkVersion: '<5.0.0'
};
exports['ios-appicon-76'] = {
  type: 'icon',
  path: path.join(':assets:', 'iphone', 'appicon-76.png'),
  size: 76,
  platforms: ['ipad'],
  minVersion: 7,
  sdkVersion: '<5.0.0'
};
exports['ios-appicon-76@2x'] = {
  type: 'icon',
  path: path.join(':assets:', 'iphone', 'appicon-76@2x.png'),
  size: 152,
  platforms: ['ipad'],
  minVersion: 7,
  sdkVersion: '<5.0.0'
};

// Spotlight & Settings icons
exports['ios-appicon-Small'] = {
  type: 'icon',
  path: path.join(':assets:', 'iphone', 'appicon-Small.png'),
  size: 29,
  platforms: ['iphone', 'ios'],
  sdkVersion: '<5.0.0'
};
exports['ios-appicon-Small@2x'] = {
  type: 'icon',
  path: path.join(':assets:', 'iphone', 'appicon-Small@2x.png'),
  size: 58,
  platforms: ['iphone', 'ios'],
  sdkVersion: '<5.0.0'
};
exports['ios-appicon-Small@3x'] = {
  type: 'icon',
  path: path.join(':assets:', 'iphone', 'appicon-Small@3x.png'),
  size: 87,
  platforms: ['iphone'],
  minVersion: 8,
  sdkVersion: '<5.0.0'
};
exports['ios-appicon-Small-40'] = {
  type: 'icon',
  path: path.join(':assets:', 'iphone', 'appicon-Small-40.png'),
  size: 40,
  platforms: ['ios'],
  minVersion: 7,
  sdkVersion: '<5.0.0'
};
exports['ios-appicon-Small-40@2x'] = {
  type: 'icon',
  path: path.join(':assets:', 'iphone', 'appicon-Small-40@2x.png'),
  size: 80,
  platforms: ['ios'],
  minVersion: 7,
  sdkVersion: '<5.0.0'
};
exports['ios-appicon-Small-50'] = {
  type: 'icon',
  path: path.join(':assets:', 'iphone', 'appicon-Small-50.png'),
  size: 50,
  platforms: ['ipad'],
  maxVersion: 6,
  sdkVersion: '<5.0.0'
};
exports['ios-appicon-Small-50@2x'] = {
  type: 'icon',
  path: path.join(':assets:', 'iphone', 'appicon-Small-50@2x.png'),
  size: 100,
  platforms: ['ipad'],
  maxVersion: 6,
  sdkVersion: '<5.0.0'
};
exports['ios-appicon-83.5@2x'] = {
  type: 'icon',
  path: path.join(':assets:', 'iphone', 'appicon-83.5@2x.png'),
  size: 167,
  platforms: ['ipad'],
  minVersion: 9,
  sdkVersion: '<5.0.0'
};

// Apple Watch
exports['apple-watch-24@2x'] = {
  type: 'icon',
  path: path.join('apple-watch', 'icon-24@2x.png'),
  size: 48,
  platforms: ['apple-watch']
};
exports['apple-watch-27.5@2x'] = {
  type: 'icon',
  path: path.join('apple-watch', 'icon-27.5@2x.png'),
  size: 55,
  platforms: ['apple-watch']
};
exports['apple-watch-29@2x'] = {
  type: 'icon',
  path: path.join('apple-watch', 'icon-29@2x.png'),
  size: 58,
  platforms: ['apple-watch']
};
exports['apple-watch-29@3x'] = {
  type: 'icon',
  path: path.join('apple-watch', 'icon-29@3x.png'),
  size: 87,
  platforms: ['apple-watch']
};
exports['apple-watch-40@2x'] = {
  type: 'icon',
  path: path.join('apple-watch', 'icon-40@2x.png'),
  size: 80,
  platforms: ['apple-watch']
};
exports['apple-watch-44@2x'] = {
  type: 'icon',
  path: path.join('apple-watch', 'icon-44@2x.png'),
  size: 88,
  platforms: ['apple-watch']
};
exports['apple-watch-86@2x'] = {
  type: 'icon',
  path: path.join('apple-watch', 'icon-86@2x.png'),
  size: 172,
  platforms: ['apple-watch']
};
exports['apple-watch-98@2x'] = {
  type: 'icon',
  path: path.join('apple-watch', 'icon-98@2x.png'),
  size: 196,
  platforms: ['apple-watch']
};

// Splashes
exports['ios-Default'] = {
  type: 'splash',
  path: path.join(':assets:', 'iphone', 'Default.png'),
  localePath: path.join(':i18n:', ':locale:', 'Default.png'),
  width: 320,
  height: 480,
  platforms: ['iphone', 'ios'],
  sdkVersion: '<5.0.0'
};
exports['ios-Default@2x'] = {
  type: 'splash',
  path: path.join(':assets:', 'iphone', 'Default@2x.png'),
  localePath: path.join(':i18n:', ':locale:', 'Default@2x.png'),
  width: 640,
  height: 960,
  platforms: ['iphone']
};
exports['ios-Default-568h@2x'] = {
  type: 'splash',
  path: path.join(':assets:', 'iphone', 'Default-568h@2x.png'),
  localePath: path.join(':i18n:', ':locale:', 'Default-568h@2x.png'),
  width: 640,
  height: 1136,
  platforms: ['iphone']
};
exports['ios-Default-667h@2x'] = {
  type: 'splash',
  path: path.join(':assets:', 'iphone', 'Default-667h@2x.png'),
  localePath: path.join(':i18n:', ':locale:', 'Default-667h@2x.png'),
  width: 750,
  height: 1334,
  platforms: ['iphone']
};
exports['ios-Default-Portrait-736h@3x'] = {
  type: 'splash',
  path: path.join(':assets:', 'iphone', 'Default-Portrait-736h@3x.png'),
  localePath: path.join(':i18n:', ':locale:', 'Default-Portrait-736h@3x.png'),
  width: 1242,
  height: 2208,
  platforms: ['iphone']
};
exports['ios-Default-Landscape-736h@3x'] = {
  type: 'splash',
  path: path.join(':assets:', 'iphone', 'Default-Landscape-736h@3x.png'),
  localePath: path.join(':i18n:', ':locale:', 'Default-Landscape-736h@3x.png'),
  width: 2208,
  height: 1242,
  platforms: ['iphone']
};
exports['ios-Default-Portrait-2436h@3x'] = {
  type: 'splash',
  path: path.join(':assets:', 'iphone', 'Default-Portrait-2436h@3x.png'),
  localePath: path.join(':i18n:', ':locale:', 'Default-Portrait-2436h@3x.png'),
  width: 1125,
  height: 2436,
  platforms: ['iphone'],
  sdkVersion: '>=6.3.0'
};
exports['ios-Default-Landscape-2436h@3x'] = {
  type: 'splash',
  path: path.join(':assets:', 'iphone', 'Default-Landscape-2436h@3x.png'),
  localePath: path.join(':i18n:', ':locale:', 'Default-Landscape-2436h@3x.png'),
  width: 2436,
  height: 1125,
  platforms: ['iphone'],
  sdkVersion: '>=6.3.0'
};
exports['ios-Default-Portrait-2688h@3x'] = {
  type: 'splash',
  path: path.join(':assets:', 'iphone', 'Default-Portrait-2688h@3x.png'),
  localePath: path.join(':i18n:', ':locale:', 'Default-Portrait-2688h@3x.png'),
  width: 1242,
  height: 2688,
  platforms: ['iphone'],
  sdkVersion: '>=7.4.0'
};
exports['ios-Default-Landscape-2688h@3x'] = {
  type: 'splash',
  path: path.join(':assets:', 'iphone', 'Default-Landscape-2688h@3x.png'),
  localePath: path.join(':i18n:', ':locale:', 'Default-Landscape-2688h@3x.png'),
  width: 2688,
  height: 1242,
  platforms: ['iphone'],
  sdkVersion: '>=7.4.0'
};
exports['ios-Default-Portrait-1792h@2x'] = {
  type: 'splash',
  path: path.join(':assets:', 'iphone', 'Default-Portrait-1792h@2x.png'),
  localePath: path.join(':i18n:', ':locale:', 'Default-Portrait-1792h@2x.png'),
  width: 828,
  height: 1792,
  platforms: ['iphone'],
  sdkVersion: '>=7.4.0'
};
exports['ios-Default-Landscape-1792h@2x'] = {
  type: 'splash',
  path: path.join(':assets:', 'iphone', 'Default-Landscape-1792h@2x.png'),
  localePath: path.join(':i18n:', ':locale:', 'Default-Landscape-1792h@2x.png'),
  width: 1792,
  height: 828,
  platforms: ['iphone'],
  sdkVersion: '>=7.4.0'
};
exports['ios-Default-Portrait'] = {
  type: 'splash',
  path: path.join(':assets:', 'iphone', 'Default-Portrait.png'),
  localePath: path.join(':i18n:', ':locale:', 'Default-Portrait.png'),
  width: 768,
  height: 1004,
  heightFix: 1024,
  platforms: ['ipad'],
  orientation: 'portrait'
};
exports['ios-Default-Portrait@2x'] = {
  type: 'splash',
  path: path.join(':assets:', 'iphone', 'Default-Portrait@2x.png'),
  localePath: path.join(':i18n:', ':locale:', 'Default-Portrait@2x.png'),
  width: 1536,
  height: 2008,
  heightFix: 2048,
  platforms: ['ipad'],
  orientation: 'portrait'
};
exports['ios-Default-Landscape'] = {
  type: 'splash',
  path: path.join(':assets:', 'iphone', 'Default-Landscape.png'),
  localePath: path.join(':i18n:', ':locale:', 'Default-Landscape.png'),
  width: 1024,
  height: 748,
  heightFix: 768,
  platforms: ['ipad'],
  orientation: 'landscape'
};
exports['ios-Default-Landscape@2x'] = {
  type: 'splash',
  path: path.join(':assets:', 'iphone', 'Default-Landscape@2x.png'),
  localePath: path.join(':i18n:', ':locale:', 'Default-Landscape@2x.png'),
  width: 2048,
  height: 1496,
  heightFix: 1536,
  platforms: ['ipad'],
  orientation: 'landscape'
};

exports['LaunchLogo~iphone'] = {
  type: 'splash',
  path: path.join(':assets:', 'iphone', 'LaunchLogo~iphone.png'),
  size: 320,
  platforms: ['iphone'],
  sdkVersion: '>=5.2.0',
  alpha: true,
  storyboard: true
};
exports['LaunchLogo@2x~iphone'] = {
  type: 'splash',
  path: path.join(':assets:', 'iphone', 'LaunchLogo@2x~iphone.png'),
  size: 374,
  platforms: ['iphone'],
  sdkVersion: '>=5.2.0',
  alpha: true,
  storyboard: true
};
exports['LaunchLogo@3x~iphone'] = {
  type: 'splash',
  path: path.join(':assets:', 'iphone', 'LaunchLogo@3x~iphone.png'),
  size: 621,
  platforms: ['iphone'],
  sdkVersion: '>=5.2.0',
  alpha: true,
  storyboard: true
};
exports['LaunchLogo~ipad'] = {
  type: 'splash',
  path: path.join(':assets:', 'iphone', 'LaunchLogo~ipad.png'),
  size: 384,
  platforms: ['ipad'],
  sdkVersion: '>=5.2.0',
  alpha: true,
  storyboard: true
};
exports['LaunchLogo@2x~ipad'] = {
  type: 'splash',
  path: path.join(':assets:', 'iphone', 'LaunchLogo@2x~ipad.png'),
  size: 1024,
  platforms: ['ipad'],
  sdkVersion: '>=5.2.0',
  alpha: true,
  storyboard: true
};

// assets
exports['ios-images@3x'] = {
  type: 'asset',
  path: path.join(':assets:', 'iphone', 'images'),
  dpi: constants.dpi.xxhdpi,
  platforms: ['ios'],
  suffix: '@3x'
};
exports['ios-images@2x'] = {
  type: 'asset',
  path: path.join(':assets:', 'iphone', 'images'),
  dpi: constants.dpi.xhdpi,
  platforms: ['ios'],
  suffix: '@2x'
};
exports['ios-images'] = {
  type: 'asset',
  path: path.join(':assets:', 'images'),
  dpi: constants.dpi.mdpi,
  platforms: ['ios', 'android', 'mobileweb', 'tizen', 'blackberry']
};

/**
 * Android
 */

// Google Play
exports['android-MarketplaceArtwork'] = {
  type: 'icon',
  path: path.join('MarketplaceArtwork.png'),
  size: 512,
  platforms: ['android']
};
exports['android-MarketplaceArtworkFeature'] = {
  type: 'splash',
  path: path.join('MarketplaceArtworkFeature.png'),
  alsoNine: true,
  width: 1024,
  height: 500,
  platforms: ['android']
};

// icons
exports['android-appicon'] = {
  type: 'icon',
  path: path.join(':assets:', 'android', 'appicon.png'),
  size: 128,
  alpha: true,
  platforms: ['android']
};
exports['android-appicon-ldpi'] = {
  type: 'icon',
  path: path.join(':platform:', 'android', 'res', 'drawable-ldpi', 'appicon.png'),
  size: 36,
  alpha: true,
  dpi: constants.dpi.ldpi,
  platforms: ['android']
};
exports['android-appicon-mdpi'] = {
  type: 'icon',
  path: path.join(':platform:', 'android', 'res', 'drawable-mdpi', 'appicon.png'),
  size: 48,
  alpha: true,
  dpi: constants.dpi.mdpi,
  platforms: ['android']
};
exports['android-appicon-hdpi'] = {
  type: 'icon',
  path: path.join(':platform:', 'android', 'res', 'drawable-hdpi', 'appicon.png'),
  size: 72,
  alpha: true,
  dpi: constants.dpi.hdpi,
  platforms: ['android']
};
exports['android-appicon-xhdpi'] = {
  type: 'icon',
  path: path.join(':platform:', 'android', 'res', 'drawable-xhdpi', 'appicon.png'),
  size: 96,
  alpha: true,
  dpi: constants.dpi.xhdpi,
  platforms: ['android']
};
exports['android-appicon-xxhdpi'] = {
  type: 'icon',
  path: path.join(':platform:', 'android', 'res', 'drawable-xxhdpi', 'appicon.png'),
  size: 144,
  alpha: true,
  dpi: constants.dpi.xxhdpi,
  platforms: ['android']
};
exports['android-appicon-xxxhdpi'] = {
  type: 'icon',
  path: path.join(':platform:', 'android', 'res', 'drawable-xxxhdpi', 'appicon.png'),
  size: 192,
  alpha: true,
  dpi: constants.dpi.xxxhdpi,
  platforms: ['android']
};

// splashes
exports['android-default'] = { // mdpi
  type: 'splash',
  path: path.join(':assets:', 'android', 'default.png'),
  width: 320,
  height: 480,
  platforms: ['android']
};
exports['android-default-long-land-xxxhdpi'] = {
  type: 'splash',
  path: path.join(':assets:', 'android', 'images', 'res-long-land-xxxhdpi', 'default.png'),
  localePath: path.join(':assets:', 'android', 'images', 'res-:locale:-long-land-xxxhdpi', 'default.png'),
  width: 1920,
  height: 1280,
  dpi: constants.dpi.xxxhdpi,
  platforms: ['android'],
  orientation: 'landscape'
};
exports['android-default-long-land-xxhdpi'] = {
  type: 'splash',
  path: path.join(':assets:', 'android', 'images', 'res-long-land-xxhdpi', 'default.png'),
  localePath: path.join(':assets:', 'android', 'images', 'res-:locale:-long-land-xxhdpi', 'default.png'),
  width: 1600,
  height: 960,
  dpi: constants.dpi.xxhdpi,
  platforms: ['android'],
  orientation: 'landscape'
};
exports['android-default-long-land-xhdpi'] = {
  type: 'splash',
  path: path.join(':assets:', 'android', 'images', 'res-long-land-xhdpi', 'default.png'),
  localePath: path.join(':assets:', 'android', 'images', 'res-:locale:-long-land-xhdpi', 'default.png'),
  width: 960,
  height: 640,
  dpi: constants.dpi.xhdpi,
  platforms: ['android'],
  orientation: 'landscape'
};
exports['android-default-long-land-hdpi'] = {
  type: 'splash',
  path: path.join(':assets:', 'android', 'images', 'res-long-land-hdpi', 'default.png'),
  localePath: path.join(':assets:', 'android', 'images', 'res-:locale:-long-land-hdpi', 'default.png'),
  width: 800,
  height: 480,
  dpi: constants.dpi.hdpi,
  platforms: ['android'],
  orientation: 'landscape'
};
exports['android-default-long-land-mdpi'] = { // missing in docs and needed because mdpi default is portrait
  type: 'splash',
  path: path.join(':assets:', 'android', 'images', 'res-long-land-mdpi', 'default.png'),
  localePath: path.join(':assets:', 'android', 'images', 'res-:locale:-long-land-mdpi', 'default.png'),
  width: 480,
  height: 320,
  dpi: constants.dpi.mdpi,
  platforms: ['android'],
  orientation: 'landscape'
};
exports['android-default-long-land-ldpi'] = {
  type: 'splash',
  path: path.join(':assets:', 'android', 'images', 'res-long-land-ldpi', 'default.png'),
  localePath: path.join(':assets:', 'android', 'images', 'res-:locale:-long-land-ldpi', 'default.png'),
  width: 400,
  height: 240,
  dpi: constants.dpi.ldpi,
  platforms: ['android'],
  orientation: 'landscape'
};
exports['android-default-long-port-xxxhdpi'] = {
  type: 'splash',
  path: path.join(':assets:', 'android', 'images', 'res-long-port-xxxhdpi', 'default.png'),
  localePath: path.join(':assets:', 'android', 'images', 'res-:locale:-long-port-xxxhdpi', 'default.png'),
  width: 1280,
  height: 1920,
  dpi: constants.dpi.xxxhdpi,
  platforms: ['android'],
  orientation: 'portrait'
};
exports['android-default-long-port-xxhdpi'] = {
  type: 'splash',
  path: path.join(':assets:', 'android', 'images', 'res-long-port-xxhdpi', 'default.png'),
  localePath: path.join(':assets:', 'android', 'images', 'res-:locale:-long-port-xxhdpi', 'default.png'),
  width: 960,
  height: 1600,
  dpi: constants.dpi.xxhdpi,
  platforms: ['android'],
  orientation: 'portrait'
};
exports['android-default-long-port-xhdpi'] = {
  type: 'splash',
  path: path.join(':assets:', 'android', 'images', 'res-long-port-xhdpi', 'default.png'),
  localePath: path.join(':assets:', 'android', 'images', 'res-:locale:-long-port-xhdpi', 'default.png'),
  width: 640,
  height: 960,
  dpi: constants.dpi.xhdpi,
  platforms: ['android'],
  orientation: 'portrait'
};
exports['android-default-long-port-hdpi'] = {
  type: 'splash',
  path: path.join(':assets:', 'android', 'images', 'res-long-port-hdpi', 'default.png'),
  localePath: path.join(':assets:', 'android', 'images', 'res-:locale:-long-port-hdpi', 'default.png'),
  width: 480,
  height: 800,
  dpi: constants.dpi.hdpi,
  platforms: ['android'],
  orientation: 'portrait'
};
exports['android-default-long-port-mdpi'] = { // missing in docs and needed for locale
  type: 'splash',
  path: path.join(':assets:', 'android', 'images', 'res-long-port-mdpi', 'default.png'),
  localePath: path.join(':assets:', 'android', 'images', 'res-:locale:-long-port-mdpi', 'default.png'),
  width: 320,
  height: 480,
  dpi: constants.dpi.mdpi,
  platforms: ['android'],
  orientation: 'portrait'
};
exports['android-default-long-port-ldpi'] = {
  type: 'splash',
  path: path.join(':assets:', 'android', 'images', 'res-long-port-ldpi', 'default.png'),
  localePath: path.join(':assets:', 'android', 'images', 'res-:locale:-long-port-ldpi', 'default.png'),
  width: 240,
  height: 400,
  dpi: constants.dpi.ldpi,
  platforms: ['android'],
  orientation: 'portrait'
};
exports['android-default-notlong-land-xxxhdpi'] = {
  type: 'splash',
  path: path.join(':assets:', 'android', 'images', 'res-notlong-land-xxxhdpi', 'default.png'),
  localePath: path.join(':assets:', 'android', 'images', 'res-:locale:-notlong-land-xxxhdpi', 'default.png'),
  width: 1920,
  height: 1280,
  dpi: constants.dpi.xxhdpi,
  platforms: ['android'],
  orientation: 'landscape'
};
exports['android-default-notlong-land-xxhdpi'] = {
  type: 'splash',
  path: path.join(':assets:', 'android', 'images', 'res-notlong-land-xxhdpi', 'default.png'),
  localePath: path.join(':assets:', 'android', 'images', 'res-:locale:-notlong-land-xxhdpi', 'default.png'),
  width: 1600,
  height: 960,
  dpi: constants.dpi.xxhdpi,
  platforms: ['android'],
  orientation: 'landscape'
};
exports['android-default-notlong-land-xhdpi'] = {
  type: 'splash',
  path: path.join(':assets:', 'android', 'images', 'res-notlong-land-xhdpi', 'default.png'),
  localePath: path.join(':assets:', 'android', 'images', 'res-:locale:-notlong-land-xhdpi', 'default.png'),
  width: 960,
  height: 640,
  dpi: constants.dpi.xhdpi,
  platforms: ['android'],
  orientation: 'landscape'
};
exports['android-default-notlong-land-hdpi'] = {
  type: 'splash',
  path: path.join(':assets:', 'android', 'images', 'res-notlong-land-hdpi', 'default.png'),
  localePath: path.join(':assets:', 'android', 'images', 'res-:locale:-notlong-land-hdpi', 'default.png'),
  width: 800,
  widthFix: 640,
  height: 480,
  dpi: constants.dpi.hdpi,
  platforms: ['android'],
  orientation: 'landscape'
};
exports['android-default-notlong-land-mdpi'] = {
  type: 'splash',
  path: path.join(':assets:', 'android', 'images', 'res-notlong-land-mdpi', 'default.png'),
  localePath: path.join(':assets:', 'android', 'images', 'res-:locale:-notlong-land-mdpi', 'default.png'),
  width: 480,
  height: 320,
  dpi: constants.dpi.mdpi,
  platforms: ['android'],
  orientation: 'landscape'
};
exports['android-default-notlong-land-ldpi'] = {
  type: 'splash',
  path: path.join(':assets:', 'android', 'images', 'res-notlong-land-ldpi', 'default.png'),
  localePath: path.join(':assets:', 'android', 'images', 'res-:locale:-notlong-land-ldpi', 'default.png'),
  width: 320,
  height: 240,
  dpi: constants.dpi.ldpi,
  platforms: ['android'],
  orientation: 'landscape'
};
exports['android-default-notlong-port-xxxhdpi'] = {
  type: 'splash',
  path: path.join(':assets:', 'android', 'images', 'res-notlong-port-xxxhdpi', 'default.png'),
  localePath: path.join(':assets:', 'android', 'images', 'res-:locale:-notlong-port-xxxhdpi', 'default.png'),
  ninePath: path.join(':platform:', 'android', 'res', 'drawable-xxxhdpi', 'background.9.png'),
  nineLocalePath: path.join(':platform:', 'android', 'res', 'drawable-:locale:-xxxhdpi', 'background.9.png'),
  width: 1280,
  height: 1920,
  dpi: constants.dpi.xxxhdpi,
  platforms: ['android'],
  orientation: 'portrait'
};
exports['android-default-notlong-port-xxhdpi'] = {
  type: 'splash',
  path: path.join(':assets:', 'android', 'images', 'res-notlong-port-xxhdpi', 'default.png'),
  localePath: path.join(':assets:', 'android', 'images', 'res-:locale:-notlong-port-xxhdpi', 'default.png'),
  ninePath: path.join(':platform:', 'android', 'res', 'drawable-xxhdpi', 'background.9.png'),
  nineLocalePath: path.join(':platform:', 'android', 'res', 'drawable-:locale:-xxhdpi', 'background.9.png'),
  width: 960,
  height: 1600,
  dpi: constants.dpi.xxhdpi,
  platforms: ['android'],
  orientation: 'portrait'
};
exports['android-default-notlong-port-xhdpi'] = {
  type: 'splash',
  path: path.join(':assets:', 'android', 'images', 'res-notlong-port-xhdpi', 'default.png'),
  localePath: path.join(':assets:', 'android', 'images', 'res-:locale:-notlong-port-xhdpi', 'default.png'),
  ninePath: path.join(':platform:', 'android', 'res', 'drawable-xhdpi', 'background.9.png'),
  nineLocalePath: path.join(':platform:', 'android', 'res', 'drawable-:locale:-xhdpi', 'background.9.png'),
  width: 640,
  height: 960,
  dpi: constants.dpi.xhdpi,
  platforms: ['android'],
  orientation: 'portrait'
};
exports['android-default-notlong-port-hdpi'] = {
  type: 'splash',
  path: path.join(':assets:', 'android', 'images', 'res-notlong-port-hdpi', 'default.png'),
  localePath: path.join(':assets:', 'android', 'images', 'res-:locale:-notlong-port-hdpi', 'default.png'),
  ninePath: path.join(':platform:', 'android', 'res', 'drawable-hdpi', 'background.9.png'),
  nineLocalePath: path.join(':platform:', 'android', 'res', 'drawable-:locale:-hdpi', 'background.9.png'),
  width: 480,
  height: 800,
  heightFix: 640,
  dpi: constants.dpi.hdpi,
  platforms: ['android'],
  orientation: 'portrait'
};
exports['android-default-notlong-port-mdpi'] = {
  type: 'splash',
  path: path.join(':assets:', 'android', 'images', 'res-notlong-port-mdpi', 'default.png'),
  localePath: path.join(':assets:', 'android', 'images', 'res-:locale:-notlong-port-mdpi', 'default.png'),
  ninePath: path.join(':platform:', 'android', 'res', 'drawable-mdpi', 'background.9.png'),
  nineLocalePath: path.join(':platform:', 'android', 'res', 'drawable-:locale:-mdpi', 'background.9.png'),
  width: 320,
  height: 480,
  dpi: constants.dpi.mdpi,
  platforms: ['android'],
  orientation: 'portrait'
};
exports['android-default-notlong-port-ldpi'] = {
  type: 'splash',
  path: path.join(':assets:', 'android', 'images', 'res-notlong-port-ldpi', 'default.png'),
  localePath: path.join(':assets:', 'android', 'images', 'res-:locale:-notlong-port-ldpi', 'default.png'),
  ninePath: path.join(':platform:', 'android', 'res', 'drawable-ldpi', 'background.9.png'),
  nineLocalePath: path.join(':platform:', 'android', 'res', 'drawable-:locale:-ldpi', 'background.9.png'),
  width: 240,
  height: 320,
  dpi: constants.dpi.ldpi,
  platforms: ['android'],
  orientation: 'portrait'
};

// assets
exports['android-res-xxxhdpi'] = {
  type: 'asset',
  path: path.join(':assets:', 'android', 'images', 'res-xxxhdpi'),
  dpi: constants.dpi.xxxhdpi,
  platforms: ['android']
};
exports['android-res-xxhdpi'] = {
  type: 'asset',
  path: path.join(':assets:', 'android', 'images', 'res-xxhdpi'),
  dpi: constants.dpi.xxhdpi,
  platforms: ['android']
};
exports['android-res-xhdpi'] = {
  type: 'asset',
  path: path.join(':assets:', 'android', 'images', 'res-xhdpi'),
  dpi: constants.dpi.xhdpi,
  platforms: ['android']
};
exports['android-res-hdpi'] = {
  type: 'asset',
  path: path.join(':assets:', 'android', 'images', 'res-hdpi'),
  dpi: constants.dpi.hdpi,
  platforms: ['android']
};
exports['android-res-mdpi'] = {
  type: 'asset',
  path: path.join(':assets:', 'android', 'images', 'res-mdpi'),
  dpi: constants.dpi.mdpi,
  platforms: ['android']
};
exports['android-res-ldpi'] = {
  type: 'asset',
  path: path.join(':assets:', 'android', 'images', 'res-ldpi'),
  dpi: constants.dpi.ldpi,
  platforms: ['android']
};

/**
 * Mobile Web
 */

// icons
exports['mobileweb-appicon'] = {
  type: 'icon',
  path: path.join(':assets:', 'mobileweb', 'appicon.png'),
  size: 128,
  alpha: true,
  platforms: ['mobileweb']
};

// splashes
exports['mobileweb-Default-jpg'] = {
  type: 'splash',
  path: path.join(':assets:', 'mobileweb', 'apple_startup_images', 'Default.jpg'),
  width: 320,
  height: 460,
  platforms: ['mobileweb']
};
exports['mobileweb-Default-png'] = {
  type: 'splash',
  path: path.join(':assets:', 'mobileweb', 'apple_startup_images', 'Default.png'),
  width: 320,
  height: 460,
  platforms: ['mobileweb']
};
exports['mobileweb-Default-Landscape-jpg'] = {
  type: 'splash',
  path: path.join(':assets:', 'mobileweb', 'apple_startup_images', 'Default-Landscape.jpg'),
  width: 768,
  height: 1024,
  rotate: 90,
  platforms: ['mobileweb'],
  orientation: 'landscape'
};
exports['mobileweb-Default-Landscape-png'] = {
  type: 'splash',
  path: path.join(':assets:', 'mobileweb', 'apple_startup_images', 'Default-Landscape.png'),
  width: 768,
  height: 1024,
  rotate: 90,
  platforms: ['mobileweb'],
  orientation: 'landscape'
};
exports['mobileweb-Default-Portrait-jpg'] = {
  type: 'splash',
  path: path.join(':assets:', 'mobileweb', 'apple_startup_images', 'Default-Portrait.jpg'),
  width: 768,
  height: 1024,
  platforms: ['mobileweb'],
  orientation: 'portrait'
};
exports['mobileweb-Default-Portrait-png'] = {
  type: 'splash',
  path: path.join(':assets:', 'mobileweb', 'apple_startup_images', 'Default-Portrait.png'),
  width: 768,
  height: 1024,
  platforms: ['mobileweb'],
  orientation: 'portrait'
};

/**
 * Windows
 */

// DefaultIcon
exports['windows-DefaultIcon'] = {
  type: 'icon',
  path: path.join('DefaultIcon-windows.png'),
  size: 1024,
  alpha: true,
  platforms: ['windows']
};

// icons
exports['windows-appicon'] = {
  type: 'icon',
  path: path.join(':assets:', 'windows', 'appicon.png'),
  size: 100,
  alpha: true,
  platforms: ['windows'],
  sdkVersion: '<5.1.0'
};
exports['windows-Logo'] = {
  type: 'icon',
  path: path.join(':assets:', 'windows', 'Logo.png'),
  size: 150,
  alpha: true,
  platforms: ['windows'],
  sdkVersion: '<5.1.0'
};
exports['windows-SmallLogo'] = {
  type: 'icon',
  path: path.join(':assets:', 'windows', 'SmallLogo.png'),
  size: 30,
  alpha: true,
  platforms: ['windows'],
  sdkVersion: '<5.1.0'
};
exports['windows-StoreLogo'] = {
  type: 'icon',
  path: path.join(':assets:', 'windows', 'StoreLogo.png'),
  size: 50,
  alpha: true,
  platforms: ['windows'],
  sdkVersion: '<5.1.0'
};
exports['windows-Square44x44Logo'] = {
  type: 'icon',
  path: path.join(':assets:', 'windows', 'Square44x44Logo.png'),
  size: 44,
  alpha: true,
  platforms: ['windows'],
  sdkVersion: '<5.1.0'
};
exports['windows-Square71x71Logo'] = {
  type: 'icon',
  path: path.join(':assets:', 'windows', 'Square71x71Logo.png'),
  size: 71,
  alpha: true,
  platforms: ['windows'],
  sdkVersion: '<5.1.0'
};
exports['windows-Square150x150Logo'] = {
  type: 'icon',
  path: path.join(':assets:', 'windows', 'Square150x150Logo.png'),
  size: 150,
  alpha: true,
  platforms: ['windows'],
  sdkVersion: '<5.1.0'
};

// splashes
exports['windows-SplashScreen'] = {
  type: 'splash',
  path: path.join(':assets:', 'windows', 'SplashScreen.png'),
  width: 620,
  height: 300,
  platforms: ['windows']
};
exports['windows-SplashScreen.scale-240'] = {
  type: 'splash',
  path: path.join(':assets:', 'windows', 'SplashScreen.scale-240.png'),
  width: 1152,
  height: 1920,
  platforms: ['windows']
};

/**
 * Tizen
 */

// icons
exports['tizen-appicon'] = {
  type: 'icon',
  path: path.join(':assets:', 'tizen', 'appicon.png'),
  size: 96,
  alpha: true,
  platforms: ['tizen']
};

/**
 * BlackBerry
 */

// icons
exports['blackberry-appicon'] = {
  type: 'icon',
  path: path.join(':assets:', 'blackberry', 'appicon.png'),
  size: 114,
  alpha: true,
  platforms: ['blackberry']
};

// splashes
exports['blackberry-splash-600x1024'] = {
  type: 'splash',
  path: path.join(':assets:', 'blackberry', 'splash-600x1024.png'),
  width: 768,
  height: 1280,
  platforms: ['blackberry']
};
exports['blackberry-splash-720x720'] = {
  type: 'splash',
  path: path.join(':assets:', 'blackberry', 'splash-720x720.png'),
  width: 720,
  height: 720,
  platforms: ['blackberry']
};
exports['blackberry-splash-768x1280'] = {
  type: 'splash',
  path: path.join(':assets:', 'blackberry', 'splash-768x1280.png'),
  width: 768,
  height: 1280,
  platforms: ['blackberry']
};
