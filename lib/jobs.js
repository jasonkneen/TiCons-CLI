var _ = require('underscore'),
  path = require('path'),
  fs = require('fs-extended'),
  gm = require('gm'),
  colors = require('colors'),
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

      // pass back task
      callback(null, function(_callback) {
        self.run(spec, cfg, _callback);
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

      if (err) {
        return callback(err);
      }

      var tasks = {};

      // for each spec
      _.each(specs, function(spec) {

        // push task
        tasks[spec.name] = function(_callback) {
          self.run(spec, cfg, _callback);
        };
      });

      // pass back tasks
      callback(null, tasks);
    });
  });
};

/**
 * Run a task
 * @param  {Object}   specs    initialized specificiation
 * @param  {Object}   cfg      initialized configuration
 * @param  {Function} callback callback(err, output)
 */
exports.run = function run(spec, cfg, callback) {

  // do not output to input
  if (spec.output === cfg.input) {

    // inform CLI
    if (cfg.cli) {
      logger.info('Skipping input as output: ' + spec.output.cyan);
    }

    return callback();
  }

  // input doesn't exist
  if (!fs.existsSync(cfg.input)) {
    return callback('Input not found: ' + cfg.input);
  }

  // skiping myself as input (producses errors in parallel)
  if (spec.output === cfg.input) {
    return callback(null);
  }

  // NOTE: non-sync version didn't work in paralel
  fs.createDirSync(path.dirname(spec.output));

  var im = gm.subClass({
    imageMagick: true
  });

  // read
  var convert = im(cfg.input);

  // nine or fill
  if (!cfg.crop || (cfg.nine && spec.ninePath)) {

    // calculate resized size
    var containWidth, containHeight;

    if (cfg.inputRatio > spec.width / spec.height) {
      containWidth = spec.width;
      containHeight = spec.width / cfg.inputRatio;
    } else {
      containWidth = spec.height * cfg.inputRatio;
      containHeight = spec.height;
    }

    // resize fitting dimensions (using in() or order will be wrong for fill)
    convert = convert
      . in ('-resize'). in (spec.width + 'x' + spec.height);

    // nine
    if (cfg.nine && spec.ninePath) {

      // extent with 1px transparent border
      convert = convert
        .borderColor('none')
        .border(1, 1);

      // draw black pixels
      convert = convert
        .fill('black')
        .drawPoint(1, 0)
        .drawPoint(containWidth, 0)
        .drawPoint(0, 1)
        .drawPoint(0, containHeight);
    }

    // fill
    else {

      // calculate required padding
      var padLeft = Math.floor((spec.width - containWidth) / 2);
      var padTop = Math.floor((spec.height - containHeight) / 2);

      // enlarge canvas using outer pixel to fill (all using in() or order will be wrong)
      convert = convert
        . in ('-define')
        . in ('distort:viewport=' + spec.width + 'x' + spec.height + '-' + padLeft + '-' + padTop)
        . in ('-distort'). in ('SRT'). in ('0')
        . in ('+repage');
    }
  }

  // crop
  else {

    // resize covering dimensions
    convert = convert.resize(spec.width, spec.height, "^");

    // crop from center to exact dimensions
    convert = convert
      .gravity('Center')
      .crop(spec.width, spec.height, 0, 0);
  }

  // border radius (http://www.rubblewebs.co.uk/imagemagick/display_example.php?example=69)
  if (spec.type === 'icon' && cfg.radius > 0 && _.size(_.difference(spec.platforms, ['ios', 'ipad', 'iphone'])) > 0) {
    var radius = Math.ceil((spec.width / 100) * cfg.radius);

    // in
    convert = convert
      . in ('-size'). in (spec.width + 'x' + spec.height)
      . in ('xc:none')
      . in ('-fill'). in ('white')
      . in ('-draw'). in ('roundRectangle 0,0 ' + spec.width + ',' + spec.height + ' ' + radius + ',' + radius);

    // out
    convert = convert
      .compose('SrcIn')
      .out('-composite');
  }

  // headers
  convert = convert
    .noProfile()
    .units('PixelsPerInch')
    .density(spec.dpi, spec.dpi);

  // rotate
  if (spec.rotate) {
    convert = convert.rotate('black', spec.rotate);
  }

  // write
  convert.write(spec.output, function(err) {

    if (err) {
      return callback(err);
    }

    // async feedback for CLI
    if (cfg.cli) {
      logger.info('Generated: ' + spec.output.cyan);
    }

    // pass back output
    callback(null, spec.output);

  });

  // show command
  if (cfg.trace && cfg.cli) {
    logger.debug('Executing: ' + convert.args().join(' ').cyan);
  }
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

    // get initted spec
    var spec = _initSpec(name, cfg);

    // spec not found
    if (!spec) {
      return callback('Spec not found: ' + name);
    }

    // pass back spec
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
      if (spec.type === 'splash' && spec.orientation && cfg.orientation && cfg.orientation !== spec.orientation) {
        return;
      }

      // does not meet min dpi
      if (spec.dpi && cfg.minDpi && spec.dpi < cfg.minDpi) {
        return;
      }

      // does not meet max dpi
      if (spec.dpi && cfg.maxDpi && spec.dpi > cfg.maxDpi) {
        return;
      }

      // has no localized path
      if (cfg.locale && !spec.localePath) {
        return;
      }

      // has no 9-patch path
      if (cfg.nine && spec.type === 'splash' && _.indexOf(spec.platforms, 'android') !== -1 && !spec.ninePath) {
        return;
      }

      // does not meet at least one platform
      if (!_.some(spec.platforms, function(platform) {
        return !!cfg[platform];
      })) {

        return false;
      }

      // push initted spec
      _specs[name] = _initSpec(name, cfg);
    });

    // no specs not found
    if (_.size(_specs) === 0) {
      return callback('No specs found');
    }

    // pass back specs
    callback(null, _specs);
  });
};

function _initSpec(name, cfg) {

  // doesn't exist
  if (!specs[name]) {
    return;
  }

  // cloning
  var spec = _.clone(specs[name]);

  // name
  spec.name = name;

  // default dpi
  spec.dpi = spec.dpi || 72;

  // size to widthxheight
  if (spec.size) {
    spec.width = spec.height = spec.size;
  }

  // fix
  if (cfg.fix) {
    if (spec.widthFix) {
      spec.width = spec.widthFix;
    }
    if (spec.heightFix) {
      spec.height = spec.heightFix;
    }
  }

  // full output path
  var _path;

  if (cfg.nine && spec.ninePath) {
    _path = cfg.locale ? spec.nineLocalePath.replace(':locale:', cfg.locale) : spec.ninePath;

  } else {
    _path = (cfg.locale && spec.localePath) ? spec.localePath.replace(':locale:', cfg.locale) : spec.path;
    _path = _path.replace(':assets:', cfg.assetsDir);
  }

  spec.output = path.join(cfg.outputDir, _path);

  return spec;
}