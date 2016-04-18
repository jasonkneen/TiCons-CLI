// jscs:disable jsDoc
'use strict';

var _ = require('underscore'),
  path = require('path'),
  fs = require('fs-extended'),
  gm = require('gm'),
  semver = require('semver'),
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

  fs.exists(cfg.input, function(exists) {

    // input doesn't exist
    if (!exists) {
      return callback('Input not found: ' + cfg.input);
    }

    // NOTE: non-sync version didn't work in paralel
    fs.createDirSync(path.dirname(spec.output));

    var im = gm.subClass({
      imageMagick: true
    });

    // read
    var convert = im(cfg.input);

    var flatten = !spec.alpha && !(cfg.nine && spec.ninePath);

    // flatten
    if (flatten) {
      convert = convert.flatten();
    }

    var specRatio = spec.width / spec.height;

    var containWidth, containHeight;

    // nine or fill
    if (!cfg.crop || (cfg.nine && spec.ninePath)) {

      // only scale down
      if (cfg.inputWidth > spec.width || cfg.inputHeight > spec.height) {

        if (cfg.inputRatio > specRatio) {
          containWidth = spec.width;
          containHeight = Math.round(spec.width / cfg.inputRatio);
        } else {
          containWidth = Math.round(spec.height * cfg.inputRatio);
          containHeight = spec.height;
        }

        // resize fitting dimensions (using in() or order will be wrong for fill)
        convert = convert
          .in('-resize').in(spec.width + 'x' + spec.height);

      } else {
        containWidth = cfg.inputWidth;
        containHeight = cfg.inputHeight;
      }

      // nine
      if (cfg.nine && spec.ninePath) {

        // extent with 1px transparent border
        convert = convert
          .borderColor('none')
          .border(1, 1);

        // draw black pixels
        convert = convert
          .fill('black')

        // stretchable area
        .drawPoint(1, 0)
          .drawPoint(containWidth, 0)
          .drawPoint(0, 1)
          .drawPoint(0, containHeight)

        // padding box (required since API 21)
        .drawLine(containWidth + 1, 1, containWidth + 1, containHeight)
          .drawLine(1, containHeight + 1, containWidth, containHeight + 1);

        // fill
      } else {

        // calculate required padding
        var padLeft = Math.floor((spec.width - containWidth) / 2);
        var padTop = Math.floor((spec.height - containHeight) / 2);

        // enlarge canvas using outer pixel to fill (all using in() or order will be wrong)
        convert = convert
          .in('-define')
          .in('distort:viewport=' + spec.width + 'x' + spec.height + '-' + padLeft + '-' + padTop)
          .in('-distort').in('SRT').in('0')
          .in('+repage');
      }

      // crop
    } else {

      var resize = (function() {
        var contentRatio, z, smallerWidth, smallerHeight, factor,
          result = {
            width: spec.width,
            height: spec.height
          };

        // user has given content dimensions
        if (cfg.width && cfg.height) {
          contentRatio = cfg.width / cfg.height;

          // e.g. specs landscape, content is portrait
          if (specRatio > contentRatio) {
            z = spec.height / cfg.height;

            // e.g. specs portrait, content is landscape
          } else {
            z = spec.width / cfg.width;
          }

          // don't scale up
          if (z > 1) {
            logger.warn('Target size is bigger then content: ' + spec.output.cyan);

          } else {
            smallerWidth = Math.round(cfg.inputWidth * z);
            smallerHeight = Math.round(cfg.inputHeight * z);

            // width or height won't cover specs anymore if content needs to fit as well
            if (smallerWidth < spec.width || smallerHeight < spec.height) {
              factor = Math.max(spec.width / smallerWidth, spec.height / smallerHeight);
              logger.warn('For '.white + (spec.width + 'x' + spec.height).cyan + ' to contain '.white + (cfg.width + 'x' + cfg.height).cyan + ' the input needs to be at least: '.white + (Math.ceil(cfg.inputWidth * factor) + 'x' + Math.ceil(cfg.inputHeight * factor)).cyan);

            } else {
              result.width = smallerWidth;
              result.height = smallerHeight;
            }
          }
        }

        return result;

      })();

      // resize covering dimensions
      convert = convert.resize(resize.width, resize.height, '^');

      // crop from center to exact dimensions
      convert = convert
        .gravity('Center')
        .crop(spec.width, spec.height, 0, 0);
    }

    // border radius (http://www.rubblewebs.co.uk/imagemagick/display_example.php?example=69)
    if (spec.type === 'icon' && !flatten && cfg.radius > 0 && _.size(_.difference(spec.platforms, ['ios', 'ipad', 'iphone', 'apple-watch'])) > 0) {
      var radius = Math.ceil((spec.width / 100) * cfg.radius);

      // in
      convert = convert
        .in('-size').in(spec.width + 'x' + spec.height)
        .in('xc:none')
        .in('-fill').in('white')
        .in('-draw').in('roundRectangle 0,0 ' + (spec.width - 1) + ',' + (spec.height - 1) + ' ' + radius + ',' + radius);

      // out
      convert = convert
        .compose('SrcIn')
        .out('-composite');
    }

    // annotate
    if (cfg.label) {
      var fontSize = Math.round((containWidth || spec.width) / 11);

      convert = convert
        .fill('#F00')
        .font(path.join(__dirname, 'Calibri.ttf'))
        .fontSize(fontSize);

      if (cfg.nine && spec.ninePath) {
        convert = convert.drawText(1, (containHeight || spec.height) / 2, spec.name);
      } else {
        convert = convert.drawText(0, 0, spec.name);
      }
    }

    // headers
    convert = convert
      .noProfile()
      .units('PixelsPerInch')
      .density(spec.dpi, spec.dpi);

    // rotate
    if (spec.rotate) {
      convert = convert.rotate('white', spec.rotate);
    }

    // remove alpha
    if (flatten) {
      convert = convert.out('-background', 'white', '-alpha', 'off');
    }

    // write
    convert.write(spec.output, function(err) {

      if (err) {
        return callback(err.code === 'ENOENT' ? 'Please install ImageMagick.' : err);
      }

      // async feedback for CLI
      if (cfg.cli) {
        logger.info('Generated: ' + spec.output.cyan);
      }

      // pass back output
      callback(null, spec.output);

    });

    // show command
    if (cfg.trace) {
      logger.debug('Executing: ' + convert.args().join(' ').cyan);
    }

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

      if (!_meetsSpec(name, cfg)) {
        return;
      }

      // push initted spec
      _specs[name] = _initSpec(name, cfg);
    });

    // handle DefaultIcon
    if (cfg.type === 'icon') {
      var iOSOnly = _.difference(cfg.platforms, ['ios', 'iphone', 'ipad']).length === 0;
      var windowsOnly = (cfg.platforms.length === 1 && cfg.platforms[0] === 'windows');

      // if only one of supported platforms was targetted, use the platform specific DefaultIcon only
      if (iOSOnly || windowsOnly) {
        delete _specs.DefaultIcon;

        // if multiple platforms were targetted, use the general DefaultIcon only
      } else {
        delete _specs['ios-DefaultIcon'];
        delete _specs['windows-DefaultIcon'];
      }
    }

    // no specs not found
    if (_.size(_specs) === 0) {
      return callback('No specs found');
    }

    // pass back specs
    callback(null, _specs);
  });
};

function _meetsSpec(name, cfg) {
  var spec = specs[name];

  // does not meet type
  if (cfg.type && spec.type !== cfg.type) {
    return false;
  }

  if (spec.type === 'splash') {

    if (!!cfg.storyboard !== !!spec.storyboard) {
      return false;
    }

    // doest not meet orientation (only if we're not in 9-patch mode)
    if (!cfg.nine && spec.orientation && cfg.orientation && cfg.orientation !== spec.orientation) {
      return false;
    }

    // has no 9-patch path
    if (cfg.nine && _.indexOf(spec.platforms, 'android') !== -1 && !(spec.ninePath || spec.alsoNine)) {
      return false;
    }
  }

  // does not meet min dpi
  if (spec.dpi && cfg.minDpi && spec.dpi < cfg.minDpi) {
    return false;
  }

  // does not meet max dpi
  if (spec.dpi && cfg.maxDpi && spec.dpi > cfg.maxDpi) {
    return false;
  }

  // does not satisfy sdkVersion
  if (spec.sdkVersion && cfg.sdkVersion && !semver.satisfies(cfg.sdkVersion, spec.sdkVersion)) {
    return false;
  }

  // has no localized path
  if (cfg.locale && !spec.localePath) {
    return false;
  }

  // does not meet at least one platform
  if (!_.some(spec.platforms, function(platform) {
      return !!cfg[platform];
    })) {

    return false;
  }

  return true;
}

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
  }
  
  _path = _path.replace(':assets:', cfg.assetsDir);
  _path = _path.replace(':platform:', cfg.platformDir);
  _path = _path.replace(':i18n:', cfg.i18nDir);

  spec.output = path.join(cfg.outputDir, _path);

  return spec;
}
