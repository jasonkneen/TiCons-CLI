exports.platforms = ['ios', 'iphone', 'ipad', 'android', 'mobileweb', 'blackberry', 'tizen'];

exports.orientations = ['portrait', 'landscape'];

exports.dpi = {
  ldpi: 120,
  mdpi: 160,
  hdpi: 240,
  xhdpi: 320,
  xxhdpi: 480
};

exports.theme = '<?xml version="1.0" encoding="utf-8"?>\n<resources>\n  <style name="Theme.Titanium" parent="android:Theme">\n    <item name="android:windowBackground">@drawable/splash</item>\n    <item name="android:windowNoTitle">true</item>\n  </style>\n</resources>';