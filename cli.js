#!/usr/bin/env node

var _ = require('underscore'),
  program = require('commander'),
  updateNotifier = require('update-notifier'),
  package = require('./package.json'),
  ticons = require('./'),
  constants = require('./lib/constants'),
  logger = require('./lib/logger');

var notifier = updateNotifier();

program
  .version(package.version, '-v, --version')
  .description(package.description)
  .usage('command <args> [options]')
//.option('-w, --no-overwrite', 'do not overwrite existing files')
//.option('--min-dpi <dpi>', 'minimum density (Android)')
//.option('--max-dpi <dpi>', 'maximum density (Android)')
  .option('-d, --output-dir <path>', 'directory to write to')
  .option('-c, --classic', 'use classic instead of Alloy paths')
  .option('-t, --targets <targets>', 'one or more of: ' + constants.targets.join(','));

program.command('icons [input]')
  .usage('[input] [options]')
  .description('generate icons')
//.option('-r, --radius <percentage>', 'percentage between 0 and 50 (Android)')
  .action(icons);

program.command('splashes [input]')
  .usage('<input> [options]')
  .description('generate splash screens (aka launch images)')
//.option('-l, --locale <code>', 'outputs to locale specific folder')
  .option('-o, --orientation <orientatio>', 'one of: ' + constants.orientations.join(','))
  .option('-f, --no-fix', 'do not fix splash shift')
  .action(splashes);

program.parse(process.argv);

if (program.args.length === 0 || typeof program.args[program.args.length - 1] === 'string') {
  notifier.update && notifier.notify();

  program.help();
}

function icons(input) {
  notifier.update && notifier.notify();

  var options = _.pick(this, 'noOverwrite', 'minDpi', 'maxDpi', 'outputDir', 'classic', 'targets');

  options.cli = true;
  options.input = input;

  ticons.icons(options, function(err, output) {
    if (err) {
      logger.error(err);
    } else {
      logger.ok('Generated ' + _.size(output) + ' icons');
    }
  });
}

function splashes(input) {
  notifier.update && notifier.notify();

  var options = _.pick(this, 'noOverwrite', 'minDpi', 'maxDpi', 'outputDir', 'classic', 'targets', 'noFix');

  options.cli = true;
  options.input = input;

  ticons.splashes(options, function(err, output) {
    if (err) {
      logger.error(err);
    } else {
      logger.ok('Generated ' + _.size(output) + ' splashes');
    }
  });
}