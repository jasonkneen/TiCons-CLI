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
    args.dstPath = cfg.output;

    // skiping myself as input
    if (args.srcPath === args.dstPath) {
      return callback(null);
    }

    args.customArgs = [];

    // NOTE: as in http://www.imagemagick.org/discourse-server/viewtopic.php?f=2&t=18241#p69728
    args.customArgs.push('-set', 'units', 'PixelsPerInch', '-density', cfg.dpi || 72);

    if (cfg.size) {
      args.width = args.height = cfg.size;
    } else {
      args.width = cfg.width;

      // switch between Appcelerator and Apple specs
      args.height = (cfg.fix && cfg.heightFix) ? cfg.heightFix : cfg.height;
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

    // init spec
    var spec = _initSpec(specs[name]);

    // do not output to input
    if (_spec.output === cfg.input) {
      return callback('do not use input: ' + _spec.output);
    }

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

    var _specs = {};

    // filter specs
    _.each(specs, function(spec, name) {

      // does not meet type
      if (cfg.type && spec.type !== cfg.type) {
        return;
      }

      // doest not meet orientation
      if (spec.type === 'splash' && cfg.orientation && ((cfg.orientation === 'portrait' && spec.width > spec.height) || (cfg.orientation === 'landscape' && spec.width < spec.height))) {
        return;
      }

      // does not meet at least one target
      if (!_.some(spec.targets, function(target) {

        // ios satisfies ipad and iphone as well
        return !!cfg[target] || ((target === 'ipad' || target === 'iphone') && !! cfg.ios);

      })) {
        return false;
      }

      // init spec
      var _spec = _initSpec(spec, cfg);

      // do not output to input
      if (_spec.output === cfg.input) {

        // inform CLI
        if (cfg.cli) {
          logger.warn('skipping input as output: ' + _spec.output);
        }

        return false;
      }

      _specs[name] = _spec;
    });

    // no specs not found
    if (_.size(_specs) === 0) {
      return callback('no specs found');
    }

    // pass back specs
    callback(null, _specs);
  });
};

function _initSpec(_spec, cfg) {

  // cloning
  var spec = _.clone(_spec);

  // default dpi
  spec.dpi = spec.dpi || 72;

  // orientation
  spec.orientation = spec.size ? null : (spec.width > spec.height ? 'landscape' : 'portrait');

  // full output path
  spec.output = path.join(cfg.outputDir, (spec.parent || cfg.assetsDir), spec.path.replace(':locale:', cfg.locale || ''));

  return spec;
}