# Changelog

## 0.12.4
- Optimize code: strict, async (except assets)

## 0.12.1
- Fixes alpha channel removal failing on some Imagick versions
- Fixes new min/max defaults to fail test

## 0.12.0
- Adds `-L` / `--label` to draw the name of the icon/splash on it for debugging
- Adds Apple Watch icons (`-p apple-watch`)
- Changes default min dpi to MDPI and max to XXHDPI
- Removes alpha channels except for Android/BB/Tizen icons

## 0.11.0
- Adds Google Play Feature graphic to the `splashes` command.

## 0.10.2
- Fixes wrong filename for iPhone 6 splash image.

## 0.10.1
- Fixes generating assets for projects with no `@3x` files.

## 0.10.0
- Adds `weight` and `height` option to protect the centre area of the splash input from being cropped.

## 0.9.0
- Adds support for generating (from) `@3x` assets.

## 0.8.0
- Adds icons & splashes for iPhone 6 and iPhone 6 Plus.

## 0.7.0
- Adds support for running `ticons assets` in the root of a widget.

## 0.6.0
- Renamed `splash.9.png` to `background.9.png` to be compatible with Titanium 3.3.0
- No longer generates theme.xml to be compatible with Titanium 3.3.0

## 0.5.2
- Adds `xxxhdpi` density.
- Adds support for defaulting to `xxxhdpi` or `xxhpdi` source for `assets` command.

## 0.5.1
- Fixes CLI not working with default input.

## 0.5.0
- Adds `assets` command to generate missing asset densities.

## 0.4.0
- No longer scales up when using `--no-crop`.
- Fixes tests not working on Windows.

## 0.3.5
- Fixes `radius` not working (again).

## 0.3.4
- Fixes #6 when `splashes` was called with no input.

## 0.3.3
- Adds icon for Google Play and iTunesConnect.
- Adds new splash sizes for BlackBerry.

## 0.3.2
- Adds xxhdpi splash screens.
- Fixes `radius` not working.

## 0.3.1
- Fixes locked orientation not detected correctly.
- Fizes `ios` platform not being translated to spec filter correctly.

## 0.3.0
- **BREAKING**: Renamed `classic` to `alloy` (detection when not used stays same).
- Adds `--no-crop` to **not** crop but contain and fill splashes.

## 0.2.0
- Adds `--no-nine` to **not** use the now included 9-patch support!
- Adds fixes for some errors in Appcelerator Android splash specs

## 0.1.0
- **BREAKING:** Renamed `targets` to `platforms` to be inline with `ti`.
- Adds `splashes` to generate splash screens (aka launch images).
- Adds `--min-dpi` and `--max-dpi` to leave out `ldpi` for example.
- Adds `--trace` to display config and ImageMagick commands.
- Adds `--radius` to round corners of non-iOS icons.
- Adds `--locale` to output splashes to i18n folders.
- Adds `--orientation` to generate splashes for portrait/landscape only.
- Adds `--no-fix` to **not** use the official Apple splash specs to fix shifting.
- Adds lots of smart defaults based on project you're in!

## 0.0.2
- First version on NPM, including support for icons only