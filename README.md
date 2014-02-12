# TiCons CLI
Command-line and CommonJS module version of [TiCons](http://ticons.fokkezb.nl) to generate icons and splash screens (aka launch images) for [Appcelerator](http://appcelerator.com) [Titanium](http://appcelerator.com/titanium) & [Alloy](http://appcelerator.com/alloy) apps.

[![Appcelerator Titanium](http://www-static.appcelerator.com/badges/titanium-git-badge-sq.png)](http://appcelerator.com/titanium/) [![Appcelerator Alloy](http://www-static.appcelerator.com/badges/alloy-git-badge-sq.png)](http:/appcelerator.com/alloy/)

## Install [![NPM version](https://badge.fury.io/js/ticons.png)](http://badge.fury.io/js/ticons)

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

TiCons requires [ImageMagick](http://www.imagemagick.org/) CLI tools to be installed. If you're on OS X you can use Homebrew:

```
brew install imagemagick
```

## Quick Start
TiCons can be used both as CLI and CommonJS module.

### Smart defaults
If the `outputDir` (`-d`) contains a project, *TiCons* will figure out lots of smart defaults, like if the project is Alloy or not, if it is locked to a single orientation and what platforms are targeted. Use the `trace` (`-t`) option to see what exact configuration is used.

### CLI
Hit `ticons -h` for full usage, but this will cover 80%:

- Detect if the CWD contains a classic or Alloy project and generate icons for all `tiapp.xml` deployment targets, based on `iphone/iTunesArtwork@2x`:

     ```
     ~/myproject $ ticons icons
     ```

- Output iPad and Android icons to a classic folder structure under `foo`, using `icon.png` as the input:

     ```
     ~ ticons icons icon.png -d foo -p ipad,android -c
     ```

- Detect if the CWD contains a classic or Alloy project and generate splashes for all `tiapp.xml` deployment targets, based on `iphone/Default@2x.png`:

     ```
     ~/myproject ticons splashes
     ```
     
- Output iPad and Android icons to a classic folder structure under `foo`, using `icon.png` as the input:

     ```
     ~ ticons splashes splash.png -d foo -p ipad,android -c
     ```

    **TIP:** For best results use a 2048x2048 PNG with the main artwork in the center 1024x1024 pixels so it crops nice for all dimensions and orientations.

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

## Roadmap
Feel free to fork and contribute towards:

- Add generating 9-patch splash for Android.
- Add generating App Store and Google Play assets based on icon.
- Add generating general assets in various densities based on retina or xhdpi.
- Add generating HTML splash for Mobile Web.

## Tests [![Build Status](https://travis-ci.org/FokkeZB/TiCons-CLI.png)](https://travis-ci.org/FokkeZB/TiCons-CLI)

1. Install [node.js](http://nodejs.org/).
2. Install [grunt](http://gruntjs.com/): `[sudo] npm install -g grunt-cli`
3. Clone the repo: `git clone https://github.com/fokkezb/ticons-cli.git && cd ticons-cli && npm install`
4. Run tests: `grunt test`

## Issues

Please report issues and features requests in the repo's [issue tracker](https://github.com/fokkezb/ticons-cli/issues).

## License

Distributed under [MIT License](LICENSE).