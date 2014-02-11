var _ = require('underscore'),
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

    if (!cfg.input) {
      return callback('missing required argument `input`');
    }

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