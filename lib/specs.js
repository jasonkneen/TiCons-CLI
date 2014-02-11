var path = require('path');

/**
 * iOS
 */

// iTunes Artwork
exports['ios-iTunesArtwork'] = {
  type: 'icon',
  path: path.join('iphone', 'iTunesArtwork'),
  size: 512,
  targets: ['ios']
};
exports['ios-iTunesArtwork@2x'] = {
  type: 'icon',
  path: path.join('iphone', 'iTunesArtwork@2x'),
  size: 1024,
  targets: ['ios']
};

// App icons
exports['ios-appicon'] = {
  type: 'icon',
  path: path.join('iphone', 'appicon.png'),
  size: 57,
  targets: ['iphone','ios']
};
exports['ios-appicon@2x'] = {
  type: 'icon',
  path: path.join('iphone', 'appicon@2x.png'),
  size: 114,
  targets: ['iphone'],
  maxVersion: 6
};
exports['ios-appicon-60'] = {
  type: 'icon',
  path: path.join('iphone', 'appicon-60.png'),
  size: 60,
  targets: ['iphone'],
  minVersion: 7
};
exports['ios-appicon-60@2x'] = {
  type: 'icon',
  path: path.join('iphone', 'appicon-60@2x.png'),
  size: 120,
  targets: ['iphone'],
  minVersion: 7
};
exports['ios-appicon-72'] = {
  type: 'icon',
  path: path.join('iphone', 'appicon-72.png'),
  size: 72,
  targets: ['ipad'],
  maxVersion: 6
};
exports['ios-appicon-72@2x'] = {
  type: 'icon',
  path: path.join('iphone', 'appicon-72@2x.png'),
  size: 144,
  targets: ['ipad'],
  maxVersion: 6
};
exports['ios-appicon-76'] = {
  type: 'icon',
  path: path.join('iphone', 'appicon-76.png'),
  size: 76,
  targets: ['ipad'],
  minVersion: 7
};
exports['ios-appicon-76@2x'] = {
  type: 'icon',
  path: path.join('iphone', 'appicon-76@2x.png'),
  size: 152,
  targets: ['ipad'],
  minVersion: 7
};

// Spotlight & Settings icons
exports['ios-appicon-Small'] = {
  type: 'icon',
  path: path.join('iphone', 'appicon-Small.png'),
  size: 29,
  targets: ['iphone','ios']
};
exports['ios-appicon-Small@2x'] = {
  type: 'icon',
  path: path.join('iphone', 'appicon-Small@2x.png'),
  size: 58,
  targets: ['iphone','ios']
};
exports['ios-appicon-Small-40'] = {
  type: 'icon',
  path: path.join('iphone', 'appicon-Small-40.png'),
  size: 40,
  targets: ['ios'],
  minVersion: 7
};
exports['ios-appicon-Small-40@2x'] = {
  type: 'icon',
  path: path.join('iphone', 'appicon-Small-40@2x.png'),
  size: 80,
  targets: ['ios'],
  minVersion: 7
};
exports['ios-appicon-Small-50'] = {
  type: 'icon',
  path: path.join('iphone', 'appicon-Small-50.png'),
  size: 50,
  targets: ['ipad'],
  maxVersion: 6
};
exports['ios-appicon-Small-50@2x'] = {
  type: 'icon',
  path: path.join('iphone', 'appicon-Small-50@2x.png'),
  size: 100,
  targets: ['ipad'],
  maxVersion: 6
};

// Splashes
exports['ios-Default'] = {
  type: 'splash',
  path: path.join('iphone', 'Default.png'),
  width: 320,
  height: 480,
  targets: ['iphone','ios']
};
exports['ios-Default@2x'] = {
  type: 'splash',
  path: path.join('iphone', 'Default@2x.png'),
  width: 640,
  height: 960,
  targets: ['iphone']
};
exports['ios-Default-568h@2x'] = {
  type: 'splash',
  path: path.join('iphone', 'Default-568h@2x.png'),
  width: 640,
  height: 1136,
  targets: ['iphone']
};
exports['ios-Default-Portrait'] = {
  type: 'splash',
  path: path.join('iphone', 'Default-Portrait.png'),
  width: 768,
  height: 1004,
  heightFix: 1024,
  targets: ['ipad']
};
exports['ios-Default-Portrait@2x'] = {
  type: 'splash',
  path: path.join('iphone', 'Default-Portrait@2x.png'),
  width: 1536,
  height: 2008,
  heightFix: 2048,
  targets: ['ipad']
};
exports['ios-Default-Landscape'] = {
  type: 'splash',
  path: path.join('iphone', 'Default-Landscape.png'),
  width: 1024,
  height: 748,
  heightFix: 768,
  targets: ['ipad']
};
exports['ios-Default-Landscape@2x'] = {
  type: 'splash',
  path: path.join('iphone', 'Default-Landscape@2x.png'),
  width: 2048,
  height: 1496,
  heightFix: 1536,
  targets: ['ipad']
};

/**
 * Android
 */

// icons
exports['android-appicon'] = {
  type: 'icon',
  path: path.join('android', 'appicon.png'),
  size: 128,
  targets: ['android']
};
exports['android-appicon-ldpi'] = {
  type: 'icon',
  parent: 'platform',
  path: path.join('android', 'res', 'drawable-ldpi', 'appicon.png'),
  size: 36,
  dpi: 120,
  targets: ['android']
};
exports['android-appicon-mdpi'] = {
  type: 'icon',
  parent: 'platform',
  path: path.join('android', 'res', 'drawable-mdpi', 'appicon.png'),
  size: 48,
  dpi: 160,
  targets: ['android']
};
exports['android-appicon-hdpi'] = {
  type: 'icon',
  parent: 'platform',
  path: path.join('android', 'res', 'drawable-hdpi', 'appicon.png'),
  size: 72,
  dpi: 240,
  targets: ['android']
};
exports['android-appicon-xhdpi'] = {
  type: 'icon',
  parent: 'platform',
  path: path.join('android', 'res', 'drawable-xhdpi', 'appicon.png'),
  size: 96,
  dpi: 320,
  targets: ['android']
};
exports['android-appicon-xxhdpi'] = {
  type: 'icon',
  parent: 'platform',
  path: path.join('android', 'res', 'drawable-xxhdpi', 'appicon.png'),
  size: 144,
  dpi: 480,
  targets: ['android']
};

// splashes
exports['android-default'] = {
  type: 'splash',
  path: path.join('android', 'default.png'),
  width: 320,
  height: 480,
  targets: ['android']
};
exports['android-default-long-land-xhdpi'] = {
  type: 'splash',
  path: path.join('android', 'images', 'res-:locale:long-land-xhdpi', 'default.png'),
  width: 960,
  height: 640,
  dpi: 320,
  targets: ['android']
};
exports['android-default-long-land-hdpi'] = {
  type: 'splash',
  path: path.join('android', 'images', 'res-:locale:long-land-hdpi', 'default.png'),
  width: 800,
  height: 480,
  dpi: 240,
  targets: ['android']
};
exports['android-default-long-land-ldpi'] = {
  type: 'splash',
  path: path.join('android', 'images', 'res-:locale:long-land-ldpi', 'default.png'),
  width: 400,
  height: 240,
  dpi: 120,
  targets: ['android']
};
exports['android-default-long-port-xhdpi'] = {
  type: 'splash',
  path: path.join('android', 'images', 'res-:locale:long-port-xhdpi', 'default.png'),
  width: 640,
  height: 960,
  dpi: 320,
  targets: ['android']
};
exports['android-default-long-port-hdpi'] = {
  type: 'splash',
  path: path.join('android', 'images', 'res-:locale:long-port-hdpi', 'default.png'),
  width: 480,
  height: 800,
  dpi: 240,
  targets: ['android']
};
exports['android-default-long-port-ldpi'] = {
  type: 'splash',
  path: path.join('android', 'images', 'res-:locale:long-port-ldpi', 'default.png'),
  width: 240,
  height: 400,
  dpi: 120,
  targets: ['android']
};
exports['android-default-notlong-land-xhdpi'] = {
  type: 'splash',
  path: path.join('android', 'images', 'res-:locale:notlong-land-xhdpi', 'default.png'),
  width: 960,
  height: 640,
  dpi: 320,
  targets: ['android']
};
exports['android-default-notlong-land-hdpi'] = {
  type: 'splash',
  path: path.join('android', 'images', 'res-:locale:notlong-land-hdpi', 'default.png'),
  width: 640,
  height: 480,
  dpi: 240,
  targets: ['android']
};
exports['android-default-notlong-land-mdpi'] = {
  type: 'splash',
  path: path.join('android', 'images', 'res-:locale:notlong-land-mdpi', 'default.png'),
  width: 480,
  height: 320,
  dpi: 160,
  targets: ['android']
};
exports['android-default-notlong-land-ldpi'] = {
  type: 'splash',
  path: path.join('android', 'images', 'res-:locale:notlong-land-ldpi', 'default.png'),
  width: 320,
  height: 240,
  dpi: 120,
  targets: ['android']
};

exports['android-default-notlong-port-xhdpi'] = {
  type: 'splash',
  path: path.join('android', 'images', 'res-:locale:notlong-port-xhdpi', 'default.png'),
  width: 640,
  height: 960,
  dpi: 320,
  targets: ['android']
};
exports['android-default-notlong-port-hdpi'] = {
  type: 'splash',
  path: path.join('android', 'images', 'res-:locale:notlong-port-hdpi', 'default.png'),
  width: 480,
  height: 640,
  dpi: 240,
  targets: ['android']
};
exports['android-default-notlong-port-mdpi'] = {
  type: 'splash',
  path: path.join('android', 'images', 'res-:locale:notlong-port-mdpi', 'default.png'),
  width: 320,
  height: 480,
  dpi: 160,
  targets: ['android']
};
exports['android-default-notlong-port-ldpi'] = {
  type: 'splash',
  path: path.join('android', 'images', 'res-:locale:notlong-port-ldpi', 'default.png'),
  width: 240,
  height: 320,
  dpi: 120,
  targets: ['android']
};

/**
 * Mobile Web
 */

// icons
exports['mobileweb-appicon'] = {
  type: 'icon',
  path: path.join('mobileweb', 'appicon.png'),
  size: 128,
  targets: ['mobileweb']
};

// splashes
exports['mobileweb-Default-jpg'] = {
  type: 'splash',
  path: path.join('mobileweb', 'apple_startup_images', 'Default.jpg'),
  width: 320,
  height: 460,
  targets: ['mobileweb']
};
exports['mobileweb-Default-png'] = {
  type: 'splash',
  path: path.join('mobileweb', 'apple_startup_images', 'Default.png'),
  width: 320,
  height: 460,
  targets: ['mobileweb']
};
exports['mobileweb-Default-Landscape-jpg'] = {
  type: 'splash',
  path: path.join('mobileweb', 'apple_startup_images', 'Default-Landscape.jpg'),
  width: 768,
  height: 1024,
  rotate: 90,
  targets: ['mobileweb']
};
exports['mobileweb-Default-Landscape-png'] = {
  type: 'splash',
  path: path.join('mobileweb', 'apple_startup_images', 'Default-Landscape.png'),
  width: 768,
  height: 1024,
  rotate: 90,
  targets: ['mobileweb']
};
exports['mobileweb-Default-Portrait-jpg'] = {
  type: 'splash',
  path: path.join('mobileweb', 'apple_startup_images', 'Default-Portrait.jpg'),
  width: 768,
  height: 1024,
  targets: ['mobileweb']
};
exports['mobileweb-Default-Portrait-png'] = {
  type: 'splash',
  path: path.join('mobileweb', 'apple_startup_images', 'Default-Portrait.png'),
  width: 768,
  height: 1024,
  targets: ['mobileweb']
};

/**
 * Tizen
 */

// icons
exports['tizen-appicon'] = {
  type: 'icon',
  path: path.join('tizen', 'appicon.png'),
  size: 96,
  targets: ['tizen']
};

/**
 * BlackBerry
 */

// splashes
exports['blackberry-appicon'] = {
  type: 'icon',
  path: path.join('blackberry', 'appicon.png'),
  size: 86,
  targets: ['blackberry']
};
exports['blackberry-splash-600x1024'] = {
  type: 'splash',
  path: path.join('blackberry', 'splash-600x1024.png'),
  width: 600,
  height: 1024,
  targets: ['blackberry']
};