# TiCons CLI [![Appcelerator Titanium](http://www-static.appcelerator.com/badges/titanium-git-badge-sq.png)](http://appcelerator.com/titanium/) [![Appcelerator Alloy](http://www-static.appcelerator.com/badges/alloy-git-badge-sq.png)](http:/appcelerator.com/alloy/)
 
Command-line and CommonJS module version of [TiCons](http://ticons.fokkezb.nl) to generate icons and splash screens (aka launch images) for [Appcelerator](http://appcelerator.com) [Titanium](http://appcelerator.com/titanium) & [Alloy](http://appcelerator.com/alloy) apps.

## Install [![npm](http://img.shields.io/npm/v/ticons.png)](https://www.npmjs.org/package/ticons)

As global CLI:

```
[sudo] npm install -g ticons
```

As a dependency in your projects `package.json`:

```
{
  "name": "your-project",
  "dependencies": {
    "ticons": "*"
  }
}
```

TiCons requires [ImageMagick](http://www.imagemagick.org/) CLI tools to be installed. If you're on OS X you can use the [Cactuslab installer](http://cactuslab.com/imagemagick/) or [Homebrew](http://brew.sh):

```
brew install imagemagick
```

## Quick Start
TiCons can be used both as CLI and CommonJS module.

### CLI
Hit `ticons -h` for full usage, but thanks to [Smart Defaults](#smart-defaults) this will work in most cases:

- Detects if the CWD contains a classic or Alloy project, what platforms are targeted and then generates required icons using `iphone/iTunesArtwork@2x` as input:

     ```
     ~/myproject $ ticons icons
     ```

- Detects if the CWD contains a classic or Alloy project, what platforms are targeted, if the app is locked to one orientation and then generates required splashes using `iphone/Default@2x.png` as input. If Android is targetted, 9-Patch images will be generated and the required `theme.xml` created for you if missing.

     ```
     ~/myproject ticons splashes
     ```

- Detects if the CWD contains a classic or Alloy project, what platforms are targeted and then generates missing asset densities `iphone/images` as input. If both iOS and Android MDPI are targetted, `images` is used for both iOS and Android MDPI.

     ```
     ~/myproject ticons assets
     ```
          
You can specify diferent input (`ticons icons myIcon.png`) and options to override the defaults for fine-tune the results to your liking.

### Module
For the module use the full option names as properties in the first argument. Specify a callback that accepts an error and result as the second argument.

```
var ticons = require('ticons');

ticons.icons({
	input: 'icon.png',
	outputDir: 'foo',
	targets: ['ipad','android'],
	classic: true
}, function (err, output) {
	
	if (err) {
		throw err;
	}
	
	console.log('generated files: ' + output.join(', '));
});
```

## Smart defaults
If the `outputDir` (or `-d` or CWD if missing) contains a project, *TiCons* will figure out lots of smart defaults:

- If the project is classic instead of Alloy.
- What platforms are targetted (`<deployment-targets>`).
- If the app is locked to one orientation (`UISupportedInterfaceOrientations` etc.).

In the CLI, you can add the `trace` (`-t`) option to see exactly what configuration is used based on your options and the smart defaults.

## Splashes & 9-Patch
By default *TiCons* generated [9-Patch splashes](http://docs.appcelerator.com/titanium/latest/#!/guide/Icons_and_Splash_Screens-section-29004897_IconsandSplashScreens-Androidsplashscreenconsiderations) for Android. You can disable this using `--no-nine` (`-n`) option and as an alternative disable cropping as well using `--no-crop` (`-c`) to contain and fill splash screen instead.

### 9-Patch best practice
Understand that *TiCons* will fit your input image inside the `not-long-port-?` dimensions and then add 9-Patch black pixels to indicate that only the outer most line of pixels on each side should be stretched. For best results use a square image of 1600x1600 pixels that includes the minimal amount of padding, making sure that the outer most pixels are all of the same color.

Since 0.6.0 the generated images are named `background.9.png` so that if you don't use a custom theme and build against Titanium 3.3.0.GA or later the splash will automatically be loaded. If you're using a custom theme, please [see the docs](http://docs.appcelerator.com/titanium/latest/#!/guide/Icons_and_Splash_Screens-section-29004897_IconsandSplashScreens-Androidsplashscreenconsiderations) on how to use the generated splash background. Also make sure the assets `android` directory does not contain any old splashes, because else they will take precendece.

### Cropping best practice
For best results with 9-Patch disabled use a 2048x2048 image that has its main artwork in the center 1024x1024 pixels. Anything outside of that box might be cropped depending on the orientation and ratio of the target splashes.

### Filling best practive
When cropping is disabled using `--no-crop` (`-c`) the input image will be resized to fit instead of cover the target dimension. The remaining area is then filled by stretching the outer most line of pixels on each side, basically simulating 9-Patch, but then for all platforms. For best results, see the best practice for 9-Patch and use 2048x2048 if you support iPad.

## Locale
You can use the `locale` (`-l`) option to specify a 2-letter locale. Only splashes supporting locale paths will be generated when you use this option.

## Fix or not to Fix
By default, some errors in the Appcelerator specs related to iOS and Android splash screen dimensions are fixed. Use `-no-fix` to disable this.

## Radius
If you use the `iTunesArtwork@2x` as input for Android and other platforms icons, you might want to round the corners a bit as only iOS does this for you. Simply pass a percentage between `0` and `50` to `--radius` (`-r`). Seems like `18` is about what it was for iOS6.

## Assets
The new `assets` command is beta and assumes the following directories:

- `iphone/images` for iOS retina.
- `images` for iOS non-retina, Android MDPI and other platforms.
- `android/images/res-*` for other Android DPI's.

Just run `ticons assets` in your project root and it will use `xxxhdpi`, `xxhdpi` or retina images to generate the others, unless the target image is newer or a 9-patch version is found.

## Roadmap
Feel free to fork and contribute towards:

- Add generating HTML splash for Mobile Web.

## Tests [![Travis](http://img.shields.io/travis/FokkeZB/TiCons-CLI.png)](https://travis-ci.org/FokkeZB/TiCons-CLI)

1. Install [node.js](http://nodejs.org/).
2. Install [grunt](http://gruntjs.com/): `[sudo] npm install -g grunt-cli`
3. Clone the repo: `git clone https://github.com/fokkezb/ticons-cli.git && cd ticons-cli && npm install`
4. Run tests: `grunt test`

## Issues

Please report issues and features requests in the repo's [issue tracker](https://github.com/fokkezb/ticons-cli/issues).

## License

Distributed under [MIT License](LICENSE).
