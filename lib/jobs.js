var _ = require('underscore'),
  path = require('path'),
  fs = require('fs-extended'),
  im = require('imagemagick'),
  config = require('./config'),
  specs = require('./specs'),
  logger = require('./logger');

/**
 * Creates task to run async
 * @param  {String}   name     spec to use
 * @param  {Object}   opts     options
 * @param  {Function} callback callback(err, task)
 */
exports.createTask = function createTask(name, opts, callback) {
  var self = this;

  // config
  config(opts, function(err, cfg) {

    if (err) {
      return callback(err);
    }

    // get spec
    self.getSpec(name, cfg, function(err, spec) {

      if (err) {
        return callback(err);
      }

      // merge cfg with spec
      var jobOpts = _.extend({}, cfg, spec);

      // pass back task
      callback(null, function(_callback) {
        self.run(jobOpts, _callback);
      });
    });
  });
};

/**
 * Creates tasks to run async
 * @param  {Object}   opts     options
 * @param  {Function} callback callback(err, task)
 */
exports.createTasks = function createTasks(opts, callback) {
  var self = this;

  // config
  config(opts, function(err, cfg) {

    if (err) {
      return callback(err);
    }

    // get specs
    self.getSpecs(cfg, function(err, specs) {
      var tasks = [];

      if (_.size(specs) === 0) {
        return callback('no specs found');
      }

      // for each spec
      _.each(specs, function(spec) {

        // merge cfg with spec
        var jobOpts = _.extend({}, cfg, spec);

        tasks.push(function(_callback) {
          self.run(jobOpts, _callback);
        });
      });

      // pass back tasks
      callback(null, tasks);
    });
  });
};

/**
 * Run a task
 * @param  {Object}   opts     options
 * @param  {Function} callback callback(err, output)
 */
exports.run = function run(opts, callback) {

  // config
  config(opts, function(err, cfg) {

    if (err) {
      return callback(err);
    }

    // input doesn't exist
    if (!fs.existsSync(cfg.input)) {
      return callback('input not found: ' + opts.input);
    }

    // compose imagemagick args
    var args = {};

    args.srcPath = cfg.input;
    args.dstPath = path.join(opts.outputDir, (cfg.parent || cfg.assetsDir), cfg.path);
    args.customArgs = [];

    if (cfg.dpi) {
      // NOTE: as in http://www.imagemagick.org/discourse-server/viewtopic.php?f=2&t=18241#p69728
      args.customArgs.push('-set', 'units', 'PixelsPerInch', '-density', cfg.dpi);
    }

    if (cfg.size) {
      args.width = args.height = cfg.size;
    } else {
      args.width = cfg.width;
      args.height = cfg.height;
    }

    // NOTE: non-sync version didn't work in paralel
    fs.createDirSync(path.dirname(args.dstPath));

    // resize
    im.resize(args, function(err) {

      if (err) {
        return callback(err);
      }

      // async feedback for CLI
      if (cfg.cli) {
        logger.info('Generated: ' + args.dstPath);
      }

      // pass back output
      callback(null, args.dstPath);
    });
  });
};

/**
 * Get a spec
 * @param  {String}   name     spec to get
 * @param  {Object}   opts     options
 * @param  {Function} callback callback(err, output)
 */
exports.getSpec = function getSpec(name, opts, callback) {

  // not really needed, but for consistency ;)
  config(opts, function(err, cfg) {

    if (err) {
      return callback(err);
    }

    // spec not found
    if (!specs[name]) {
      return callback('spec not found: ' + name);
    }

    var spec = _.clone(specs[name]);

    // pass back specs
    callback(null, spec);
  });
};

/**
 * Get specs
 * @param  {Object}   opts     options
 * @param  {Function} callback callback(err, output)
 */
exports.getSpecs = function getSpecs(opts, callback) {

  // config
  config(opts, function(err, cfg) {

    if (err) {
      return callback(err);
    }

    // filter specs
    var _specs = _.filter(specs, function(spec) {

      // must meet at least one target
      return _.some(spec.targets, function(target) {

        // ios satisfies ipad and iphone as well
        return !!cfg[target] || ((target === 'ipad' || target === 'iphone') && !! cfg.ios);
      });
    });

    // no specs not found
    if (_.size(_specs) === 0) {
      return callback('no specs found');
    }

    // pass back specs
    callback(null, _specs);
  });
};