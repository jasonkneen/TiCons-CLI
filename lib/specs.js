var path = require('path');

/**
 * iOS
 */

// iTunes Artwork
exports['ios-iTunesArtwork'] = {
  path: path.join('iphone', 'iTunesArtwork'),
  size: 512,
  dpi: 72,
  targets: ['ios']
};
exports['ios-iTunesArtwork@2x'] = {
  path: path.join('iphone', 'iTunesArtwork@2x'),
  size: 1024,
  dpi: 72,
  targets: ['ios']
};

// Springboard (default)
exports['ios-appicon'] = {
  path: path.join('iphone', 'appicon.png'),
  size: 57,
  dpi: 72,
  targets: ['ios']
};

// Springboard (iPhone)
exports['ios-appicon@2x'] = {
  path: path.join('iphone', 'appicon@2x.png'),
  size: 114,
  dpi: 72,
  targets: ['iphone']
};

// Springboard (iPhone for iOS7)
exports['ios-appicon-60'] = {
  path: path.join('iphone', 'appicon-60.png'),
  size: 60,
  dpi: 72,
  targets: ['iphone']
};
exports['ios-appicon-60@2x'] = {
  path: path.join('iphone', 'appicon-60@2x.png'),
  size: 120,
  dpi: 72,
  targets: ['iphone']
};

// Springboard (iPad)
exports['ios-appicon-72'] = {
  path: path.join('iphone', 'appicon-72.png'),
  size: 72,
  dpi: 72,
  targets: ['ipad']
};
exports['ios-appicon-72@2x'] = {
  path: path.join('iphone', 'appicon-72@2x.png'),
  size: 144,
  dpi: 72,
  targets: ['ipad']
};

// Springboard (iPad on iOS7)
exports['ios-appicon-76'] = {
  path: path.join('iphone', 'appicon-76.png'),
  size: 76,
  dpi: 72,
  targets: ['ipad']
};
exports['ios-appicon-76@2x'] = {
  path: path.join('iphone', 'appicon-76@2x.png'),
  size: 152,
  dpi: 72,
  targets: ['ipad']
};

// Spotlight & Settings
exports['ios-appicon-Small@2x'] = {
  path: path.join('iphone', 'appicon-Small@2x.png'),
  size: 58,
  dpi: 72,
  targets: ['ios']
};

// Spotlight & Settings (iPhone)
exports['ios-appicon-Small'] = {
  path: path.join('iphone', 'appicon-Small.png'),
  size: 29,
  dpi: 72,
  targets: ['iphone']
};

// Spotlight & Settings (iPhone on iOS7)
exports['ios-appicon-Small-40'] = {
  path: path.join('iphone', 'appicon-Small-40.png'),
  size: 40,
  dpi: 72,
  targets: ['iphone']
};
exports['ios-appicon-Small-40@2x'] = {
  path: path.join('iphone', 'appicon-Small-40@2x.png'),
  size: 80,
  dpi: 72,
  targets: ['iphone']
};

// Spotlight && Settings (iPad)
exports['ios-appicon-Small-50'] = {
  path: path.join('iphone', 'appicon-Small-50.png'),
  size: 50,
  dpi: 72,
  targets: ['ipad']
};
exports['ios-appicon-Small-50@2x'] = {
  path: path.join('iphone', 'appicon-Small-50@2x.png'),
  size: 100,
  dpi: 72,
  targets: ['ipad']
};

/**
 * Android
 */

exports['android-appicon'] = {
  path: path.join('android', 'appicon.png'),
  size: 128,
  dpi: 72,
  targets: ['android']
};

exports['android-appicon-ldpi'] = {
  parent: 'platform',
  path: path.join('android', 'res', 'drawable-ldpi', 'appicon.png'),
  size: 36,
  dpi: 120,
  targets: ['android']
};

exports['android-appicon-mdpi'] = {
  parent: 'platform',
  path: path.join('android', 'res', 'drawable-mdpi', 'appicon.png'),
  size: 48,
  dpi: 160,
  targets: ['android']
};

exports['android-appicon-hdpi'] = {
  parent: 'platform',
  path: path.join('android', 'res', 'drawable-hdpi', 'appicon.png'),
  size: 72,
  dpi: 240,
  targets: ['android']
};

exports['android-appicon-xhdpi'] = {
  parent: 'platform',
  path: path.join('android', 'res', 'drawable-xhdpi', 'appicon.png'),
  size: 96,
  dpi: 320,
  targets: ['android']
};

exports['android-appicon-xxhdpi'] = {
  parent: 'platform',
  path: path.join('android', 'res', 'drawable-xxhdpi', 'appicon.png'),
  size: 144,
  dpi: 480,
  targets: ['android']
};

/**
 * Mobile Web
 */

exports['mobileweb-appicon'] = {
  path: path.join('mobileweb', 'appicon.png'),
  size: 128,
  dpi: 72,
  targets: ['mobileweb']
};

/**
 * Tizen
 */

exports['tizen-appicon'] = {
  path: path.join('tizen', 'appicon.png'),
  size: 96,
  dpi: 72,
  targets: ['tizen']
};

/**
 * BlackBerry
 */

exports['blackberry-appicon'] = {
  path: path.join('tizen', 'appicon.png'),
  size: 86,
  dpi: 72,
  targets: ['blackberry']
};