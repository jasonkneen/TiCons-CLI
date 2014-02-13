var _ = require('underscore'),
  path = require('path'),
  fs = require('fs-extended'),
  async = require('async'),
  gm = require('gm'),
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

    // filter type
    cfg.type = 'icon';

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

    // filter type
    cfg.type = 'splash';

    // create tasks
    jobs.createTasks(cfg, function(err, tasks) {

      if (err) {
        return callback(err);
      }

      if (cfg.cli) {
        logger.info('Starting ' + _.size(tasks) + ' jobs');
      }

      // 9-patch
      if (cfg.nine && _.indexOf(cfg.platforms, 'android') !== -1) {

        if (cfg.cli) {
          logger.info('Reading original image dimensions for 9-patch support');
        }

        var im = gm.subClass({
          imageMagick: true
        });

        // read input
        im(cfg.input).ping().size(function(err, size) {

          if (err) {
            return callback(err);
          }

          cfg.inputWidth = size.width;
          cfg.inputHeight = size.height;

          var themePath = path.join(cfg.outputDir, 'platform', 'android', 'res', 'values', 'theme.xml');

          // write theme.xml
          if (!fs.existsSync(themePath)) {

            if (cfg.cli) {
              logger.info('Writing theme to enable 9-patch support: ' + themePath.cyan);
            }

            fs.createFileSync(themePath, constants.theme);
          }

          // run tasks
          async.parallel(tasks, callback);
        });

      } else {

        // run tasks
        async.parallel(tasks, callback);
      }
    });

  });

};