var _ = require('underscore'),
  path = require('path'),
  fs = require('fs-extended'),
  async = require('async'),
  config = require('./lib/config'),
  constants = require('./lib/constants'),
  logger = require('./lib/logger'),
  jobs = require('./lib/jobs');

/**
 * Generates icons
 * @param  {Object}   opts     options
 * @param  {Function} callback callback(err, output)
 */
exports.icons = function(opts, callback) {
  opts = opts || {};
  opts.type = 'icon';

  // config
  config(opts, function(err, cfg) {

    if (err) {
      return callback(err);
    }

    // no input
    if (!cfg.input) {
      var def = path.join(cfg.outputDir, cfg.assetsDir, 'iphone', 'iTunesArtwork@2x');

      // use default
      if (fs.existsSync(def)) {
        cfg.input = def;
      } else {
        return callback('missing required argument `input` or default: ' + def);
      }
    }

    // create tasks
    jobs.createTasks(cfg, function(err, tasks) {

      if (err) {
        return callback(err);
      }

      if (cfg.cli) {
        logger.info('Starting ' + _.size(tasks) + ' jobs');
      }

      // run tasks
      async.parallel(tasks, callback);

    });

  });

};

/**
 * Generates icons
 * @param  {Object}   opts     options
 * @param  {Function} callback callback(err, output)
 */
exports.splashes = function(opts, callback) {
  opts = opts || {};
  opts.type = 'splash';

  // config
  config(opts, function(err, cfg) {

    if (err) {
      return callback(err);
    }

    // no input
    if (!cfg.input) {
      var def = path.join(cfg.outputDir, cfg.assetsDir, 'iphone', 'Default-568h@2x.png');

      // use default
      if (fs.existsSync(def)) {
        cfg.input = def;
      } else {
        return callback('missing required argument `input` or default: ' + def);
      }
    }

    // create tasks
    jobs.createTasks(cfg, function(err, tasks) {

      if (err) {
        return callback(err);
      }

      if (cfg.cli) {
        logger.info('Starting ' + _.size(tasks) + ' jobs');
      }

      // write theme.xml
      if (cfg.nine && _.indexOf(cfg.platforms, 'android') !== -1) {
        var themePath = path.join(cfg.outputDir, 'platform', 'android', 'res', 'values', 'theme.xml');

        if (!fs.existsSync(themePath)) {

          if (cfg.cli) {
            logger.info('Creating theme to enable 9-Patch: ' + themePath.cyan);
          }

          fs.createFileSync(themePath, constants.theme);
        }
      }

      // run tasks
      async.parallel(tasks, callback);

    });

  });

};