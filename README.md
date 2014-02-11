# TiCons CLI
Command-line and CommonJS module version of [http://ticons.fokkezb.nl](TiCons) to generate icons and splash screens (aka launch images) for [Appcelerator](http://appcelerator.com) [Titanium](http://appcelerator.com/titanium) & [Alloy](http://appcelerator.com/alloy) apps.

[![Appcelerator Titanium](http://www-static.appcelerator.com/badges/titanium-git-badge-sq.png)](http://appcelerator.com/titanium/) [![Appcelerator Alloy](http://www-static.appcelerator.com/badges/alloy-git-badge-sq.png)](http:/appcelerator.com/alloy/)

## Install [![NPM version](https://badge.fury.io/js/ticons.png)](http://badge.fury.io/js/ticons)

```
[sudo] npm install -g ticons
```

## Quick Start
TiCons can be used both as CLI and CommonJS module.

### CLI
Hit `ticons -h` for full usage, but these will cover 80%:

- Detect if the CWD contains a classic or Alloy project and generate icons for all `tiapp.xml` deployment targets, based on `iTunesArtwork@2x`:

     ```
     ~/myproject $ ticons icons
     ```
     
- Output iPad and Android icons to a classic folder structure under `foo`, using `icon.png` as the input:


	```
	~/ ticons icons icon.png -d foo -t ipad,android -c
	```
	
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

- Add splashes
- Add options for radius, min/max dpi, locale etc.
- Add generating general assets in various densities.

## Tests [![Build Status](https://travis-ci.org/fokkezb/ticons-cli.png?branch=master)](https://travis-ci.org/fokkezb/ticons-cli)

1. Install [node.js](http://nodejs.org/).
2. Install [grunt](http://gruntjs.com/): `[sudo] npm install -g grunt-cli`
3. Clone the repo: `git clone https://github.com/fokkezb/ticons-cli.git && cd ticons-cli && npm install`
4. Run tests: `grunt test`

## Issues

Please report issues and features requests in the repo's [issue tracker](https://github.com/fokkezb/ticons-cli/issues).

## License

Distributed under [MIT License](LICENSE).