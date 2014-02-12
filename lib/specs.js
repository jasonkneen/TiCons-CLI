var path = require('path'),
  constants = require('./constants');

/**
 * iOS
 */

// iTunes Artwork
exports['ios-iTunesArtwork'] = {
  type: 'icon',
  path: path.join(':assets:', 'iphone', 'iTunesArtwork'),
  size: 512,
  platforms: ['ios']
};
exports['ios-iTunesArtwork@2x'] = {
  type: 'icon',
  path: path.join(':assets:', 'iphone', 'iTunesArtwork@2x'),
  size: 1024,
  platforms: ['ios']
};

// App icons
exports['ios-appicon'] = {
  type: 'icon',
  path: path.join(':assets:', 'iphone', 'appicon.png'),
  size: 57,
  platforms: ['iphone','ios']
};
exports['ios-appicon@2x'] = {
  type: 'icon',
  path: path.join(':assets:', 'iphone', 'appicon@2x.png'),
  size: 114,
  platforms: ['iphone'],
  maxVersion: 6
};
exports['ios-appicon-60'] = {
  type: 'icon',
  path: path.join(':assets:', 'iphone', 'appicon-60.png'),
  size: 60,
  platforms: ['iphone'],
  minVersion: 7
};
exports['ios-appicon-60@2x'] = {
  type: 'icon',
  path: path.join(':assets:', 'iphone', 'appicon-60@2x.png'),
  size: 120,
  platforms: ['iphone'],
  minVersion: 7
};
exports['ios-appicon-72'] = {
  type: 'icon',
  path: path.join(':assets:', 'iphone', 'appicon-72.png'),
  size: 72,
  platforms: ['ipad'],
  maxVersion: 6
};
exports['ios-appicon-72@2x'] = {
  type: 'icon',
  path: path.join(':assets:', 'iphone', 'appicon-72@2x.png'),
  size: 144,
  platforms: ['ipad'],
  maxVersion: 6
};
exports['ios-appicon-76'] = {
  type: 'icon',
  path: path.join(':assets:', 'iphone', 'appicon-76.png'),
  size: 76,
  platforms: ['ipad'],
  minVersion: 7
};
exports['ios-appicon-76@2x'] = {
  type: 'icon',
  path: path.join(':assets:', 'iphone', 'appicon-76@2x.png'),
  size: 152,
  platforms: ['ipad'],
  minVersion: 7
};

// Spotlight & Settings icons
exports['ios-appicon-Small'] = {
  type: 'icon',
  path: path.join(':assets:', 'iphone', 'appicon-Small.png'),
  size: 29,
  platforms: ['iphone','ios']
};
exports['ios-appicon-Small@2x'] = {
  type: 'icon',
  path: path.join(':assets:', 'iphone', 'appicon-Small@2x.png'),
  size: 58,
  platforms: ['iphone','ios']
};
exports['ios-appicon-Small-40'] = {
  type: 'icon',
  path: path.join(':assets:', 'iphone', 'appicon-Small-40.png'),
  size: 40,
  platforms: ['ios'],
  minVersion: 7
};
exports['ios-appicon-Small-40@2x'] = {
  type: 'icon',
  path: path.join(':assets:', 'iphone', 'appicon-Small-40@2x.png'),
  size: 80,
  platforms: ['ios'],
  minVersion: 7
};
exports['ios-appicon-Small-50'] = {
  type: 'icon',
  path: path.join(':assets:', 'iphone', 'appicon-Small-50.png'),
  size: 50,
  platforms: ['ipad'],
  maxVersion: 6
};
exports['ios-appicon-Small-50@2x'] = {
  type: 'icon',
  path: path.join(':assets:', 'iphone', 'appicon-Small-50@2x.png'),
  size: 100,
  platforms: ['ipad'],
  maxVersion: 6
};

// Splashes
exports['ios-Default'] = {
  type: 'splash',
  path: path.join(':assets:', 'iphone', 'Default.png'),
  localePath: path.join('i18n', ':locale:', 'Default.png'),
  width: 320,
  height: 480,
  platforms: ['iphone','ios']
};
exports['ios-Default@2x'] = {
  type: 'splash',
  path: path.join(':assets:', 'iphone', 'Default@2x.png'),
  localePath: path.join('i18n', ':locale:', 'Default@2x.png'),
  width: 640,
  height: 960,
  platforms: ['iphone']
};
exports['ios-Default-568h@2x'] = {
  type: 'splash',
  path: path.join(':assets:', 'iphone', 'Default-568h@2x.png'),
  localePath: path.join('i18n', ':locale:', 'Default-568h@2x.png'),
  width: 640,
  height: 1136,
  platforms: ['iphone']
};
exports['ios-Default-Portrait'] = {
  type: 'splash',
  path: path.join(':assets:', 'iphone', 'Default-Portrait.png'),
  localePath: path.join('i18n', ':locale:', 'Default-Portrait.png'),
  width: 768,
  height: 1004,
  heightFix: 1024,
  platforms: ['ipad'],
  orientation: 'portrait'
};
exports['ios-Default-Portrait@2x'] = {
  type: 'splash',
  path: path.join(':assets:', 'iphone', 'Default-Portrait@2x.png'),
  localePath: path.join('i18n', ':locale:', 'Default-Portrait@2x.png'),
  width: 1536,
  height: 2008,
  heightFix: 2048,
  platforms: ['ipad'],
  orientation: 'portrait'
};
exports['ios-Default-Landscape'] = {
  type: 'splash',
  path: path.join(':assets:', 'iphone', 'Default-Landscape.png'),
  localePath: path.join('i18n', ':locale:', 'Default-Landscape.png'),
  width: 1024,
  height: 748,
  heightFix: 768,
  platforms: ['ipad'],
  orientation: 'landscape'
};
exports['ios-Default-Landscape@2x'] = {
  type: 'splash',
  path: path.join(':assets:', 'iphone', 'Default-Landscape@2x.png'),
  localePath: path.join('i18n', ':locale:', 'Default-Landscape@2x.png'),
  width: 2048,
  height: 1496,
  heightFix: 1536,
  platforms: ['ipad'],
  orientation: 'landscape'
};

/**
 * Android
 */

// icons
exports['android-appicon'] = {
  type: 'icon',
  path: path.join(':assets:', 'android', 'appicon.png'),
  size: 128,
  platforms: ['android']
};
exports['android-appicon-ldpi'] = {
  type: 'icon',
  path: path.join('platform', 'android', 'res', 'drawable-ldpi', 'appicon.png'),
  size: 36,
  dpi: constants.dpi.ldpi,
  platforms: ['android']
};
exports['android-appicon-mdpi'] = {
  type: 'icon',
  path: path.join('platform', 'android', 'res', 'drawable-mdpi', 'appicon.png'),
  size: 48,
  dpi: constants.dpi.mdpi,
  platforms: ['android']
};
exports['android-appicon-hdpi'] = {
  type: 'icon',
  path: path.join('platform', 'android', 'res', 'drawable-hdpi', 'appicon.png'),
  size: 72,
  dpi: constants.dpi.hdpi,
  platforms: ['android']
};
exports['android-appicon-xhdpi'] = {
  type: 'icon',
  path: path.join('platform', 'android', 'res', 'drawable-xhdpi', 'appicon.png'),
  size: 96,
  dpi: constants.dpi.xhdpi,
  platforms: ['android']
};
exports['android-appicon-xxhdpi'] = {
  type: 'icon',
  path: path.join('platform', 'android', 'res', 'drawable-xxhdpi', 'appicon.png'),
  size: 144,
  dpi: 480,
  platforms: ['android']
};

// splashes
exports['android-default'] = {
  type: 'splash',
  path: path.join(':assets:', 'android', 'default.png'),
  width: 320,
  height: 480,
  platforms: ['android']
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
  width: 640,
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
exports['android-default-notlong-port-xhdpi'] = {
  type: 'splash',
  path: path.join(':assets:', 'android', 'images', 'res-notlong-port-xhdpi', 'default.png'),
  localePath: path.join(':assets:', 'android', 'images', 'res-:locale:-notlong-port-xhdpi', 'default.png'),
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
  width: 480,
  height: 640,
  dpi: constants.dpi.hdpi,
  platforms: ['android'],
  orientation: 'portrait'
};
exports['android-default-notlong-port-mdpi'] = {
  type: 'splash',
  path: path.join(':assets:', 'android', 'images', 'res-notlong-port-mdpi', 'default.png'),
  localePath: path.join(':assets:', 'android', 'images', 'res-:locale:-notlong-port-mdpi', 'default.png'),
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
  width: 240,
  height: 320,
  dpi: constants.dpi.ldpi,
  platforms: ['android'],
  orientation: 'portrait'
};

/**
 * Mobile Web
 */

// icons
exports['mobileweb-appicon'] = {
  type: 'icon',
  path: path.join(':assets:', 'mobileweb', 'appicon.png'),
  size: 128,
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
 * Tizen
 */

// icons
exports['tizen-appicon'] = {
  type: 'icon',
  path: path.join(':assets:', 'tizen', 'appicon.png'),
  size: 96,
  platforms: ['tizen']
};

/**
 * BlackBerry
 */

// splashes
exports['blackberry-appicon'] = {
  type: 'icon',
  path: path.join(':assets:', 'blackberry', 'appicon.png'),
  size: 86,
  platforms: ['blackberry']
};
exports['blackberry-splash-600x1024'] = {
  type: 'splash',
  path: path.join(':assets:', 'blackberry', 'splash-600x1024.png'),
  width: 600,
  height: 1024,
  platforms: ['blackberry']
};