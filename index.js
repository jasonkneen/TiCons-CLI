var _ = require('underscore'),
  path = require('path'),
  fs = require('fs'),
  async = require('async'),
  config = require('./lib/config'),
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

      // run tasks
      async.parallel(tasks, callback);
    });

  });

};