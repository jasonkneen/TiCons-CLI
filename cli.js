#!/usr/bin/env node

// jscs:disable jsDoc
'use strict';

var _ = require('underscore'),
	program = require('commander'),
	updateNotifier = require('update-notifier'),
	pkg = require('./package.json'),
	ticons = require('./'),
	constants = require('./lib/constants'),
	logger = require('./lib/logger');

var notifier = updateNotifier({
	pkg: pkg
});

program
	.version(pkg.version, '-v, --version')
	.description(pkg.description)
	.usage('command <args> [options]')
	.option('-m, --min-dpi <dpi>', 'minimum density to generate (default: `160` or `mdpi`)')
	.option('-M, --max-dpi <dpi>', 'maximum density to generate, (default e.g. `480` or `xxhdpi`)')
	.option('-d, --output-dir <path>', 'directory to write to')
	.option('-a, --alloy', 'force Alloy paths, even if not detected')
	.option('-b, --alloy-base <directory>', 'select a different alloy base directory instead of app, e.g. src')
	.option('-p, --platforms <platforms>', 'none to detect, `all` or some of: ' + constants.platforms.join(','))
	.option('-L, --label', 'draws the spec-name on each image for debugging')
	.option('-s, --sdk-version <semver>', 'Titanium SDK version, overriding detected')
	.option('-t, --trace', 'shows initialized config and actual imagemagick commands');

program.command('icons [input]')
	.description('generate icons')
	.option('-r, --radius <percentage>', 'percentage between 0 and 50 (all platforms except iOS)')
	.action(icons);

program.command('splashes [input]')
	.description('generate splash screens (aka launch images)')
	.option('-l, --locale <code>', 'outputs to i18n folders')
	.option('-o, --orientation <orientation>', 'none to detect, `all` or one of: ' + constants.orientations.join(','))
	.option('-W, --width <width>', 'width from center that may not be cropped')
	.option('-H, --height <width>', 'height from center that may not be cropped')
	.option('-S, --storyboard', 'generate LaunchLogo.png for iOS to use with storyboards')
	.option('-n, --no-nine', 'do NOT generate 9-patch images (Android)')
	.option('-c, --no-crop', 'do NOT crop splashes but contain and fill')
	.option('-f, --no-fix', 'do NOT fix errors in Appcelerator specs')
	.action(splashes);

program.command('assets [input]')
	.description('generate missing densities for input asset(s)')
	.option('-O, --orig-dpi <code>', 'input density (default: detect by file path and name)')
	.action(assets);

program.parse(process.argv);

if (program.args.length === 0 || typeof program.args[program.args.length - 1] === 'string') {
	notifier.update && notifier.notify();

	program.help();
}

function assets(input, env) {
	notifier.update && notifier.notify();

	var options = _filterOptions(env);

	options.cli = true;
	options.input = input;

	ticons.assets(options, function (err, output) {
		if (err) {
			logger.error(err);
		} else {
			logger.ok('Generated ' + _.size(_.filter(output, _.identity)) + ' assets');
		}
	});
}

function icons(input, env) {
	notifier.update && notifier.notify();

	var options = _filterOptions(env);

	options.cli = true;
	options.input = input;

	ticons.icons(options, function (err, output) {
		if (err) {
			logger.error(err);
		} else {
			logger.ok('Generated ' + _.size(_.filter(output, _.identity)) + ' icons');
		}
	});
}

function splashes(input, env) {
	notifier.update && notifier.notify();

	var options = _filterOptions(env);

	options.cli = true;
	options.input = input;

	ticons.splashes(options, function (err, output) {
		if (err) {
			logger.error(err);
		} else {
			logger.ok('Generated ' + _.size(_.filter(output, _.identity)) + ' splashes');
		}
	});
}

function _filterOptions(o) {
	var opts = o.parent ? _filterOptions(o.parent) : {};

	_.each(o, function (v, k) {
		if (k[0] !== '_' && !_.isObject(v)) {
			opts[k] = v;
		}
	});

	return opts;
}
