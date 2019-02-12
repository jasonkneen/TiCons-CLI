"use strict";

var path = require('path'),
  fs = require('fs'),
  _ = require('underscore'),
  constants = require('./constants'),
  gm = require('gm'),
  logger = require('./logger'),
  async = require('async'),
  semver = require('semver'),
  utils = require('./utils');

/**
 * Intitializes config based on options
 * @param  {Object}   opts     options
 * @param  {Function} callback callback(err, cfg)
 */
module.exports = function config(opts, callback) {
  opts = opts || {};

  // already done
  if (opts && opts.__cfg) {
    return callback(null, opts);
  }

  // convert negatives (already done by CLI, but not vor module)
  if (opts.noFix) {
    opts.fix = false;
    delete opts.noFix;
  }
  if (opts.noNine) {
    opts.nine = false;
    delete opts.noNine;
  }
  if (opts.noCrop) {
    opts.crop = false;
    delete opts.noCrop;
  }

  var cfg = _.extend({
    __cfg: true,
    type: undefined,
    cli: false,
    input: undefined,
    platforms: undefined,
    radius: 0,
    sdkVersion: undefined,
    locale: undefined,
    minDpi: constants.dpi.mdpi,
    maxDpi: constants.dpi.xxxhdpi,
    origDpi: undefined,
    orientation: undefined,
    fix: true,
    nine: true,
    crop: true,
    label: false,
    outputDir: undefined,
    assetsDir: undefined,
    platformDir: undefined,
    i18nDir: undefined,
    storyboard: false,
    alloy: undefined,
    trace: false,
    inputWidth: undefined,
    inputHeight: undefined,
    inputRatio: undefined,
    alloyBase: 'app'
  }, opts);

  var isProject = false,
    isWidget = false,
    tiappxml;

  async.series({

    radius: function (next) {

      if (cfg.radius !== 0) {
        cfg.radius = parseInt(cfg.radius, 10);

        if (cfg.radius < 0 || cfg.radius > 50) {
          return next('The `radius` percentage should be between 0 and 50.');
        }
      }

      next();
    },

    outputDir: function (next) {
      var manualOutput = false;

      if (!cfg.outputDir) {
        cfg.outputDir = process.cwd();

      } else {
        manualOutput = true;
      }

      // We are inside Resources
      if (path.basename(cfg.outputDir) === 'Resources') {

        // go up one level
        cfg.outputDir = path.dirname(cfg.outputDir);
        cfg.assetsDir = 'Resources';

      } else if (path.basename(cfg.outputDir) === 'assets') {

        // go up one level
        cfg.outputDir = path.dirname(cfg.outputDir);
        cfg.assetsDir = 'assets';

        // we are not under a widget
        if (!fs.existsSync(path.join(cfg.outputDir, 'widget.json'))) {

          // go up one more level
          cfg.assetsDir = path.join(path.basename(cfg.outputDir), cfg.assetsDir);
          cfg.outputDir = path.dirname(cfg.outputDir);
        }

        cfg.alloy = true;
      }

      fs.exists(path.join(cfg.outputDir, 'tiapp.xml'), function (exists) {

        if (exists) {
          isProject = true;
          return next();
        }

        fs.exists(path.join(cfg.outputDir, 'widget.json'), function (exists) {

          if (!exists) {

            if (!manualOutput) {
              return next('Either specify `outputDir` or run in a project root');

            } else {
              return next();
            }
          }

          isWidget = true;

          if (cfg.type !== 'asset') {
            return next('You can only target a widget using the `assets` command.');
          }

          return next();
        });

      });
    },

    alloy: function (next) {

      if (cfg.alloy !== undefined) {
        return next();
      }

      fs.exists(path.join(cfg.outputDir, cfg.alloyBase, 'controllers', 'index.js'), function (exists) {
        cfg.alloy = exists;

        next();
      });
    },

    assetsDir: function (next) {

      // set assetsDir
      if (!cfg.assetsDir) {
        if (isWidget) {
          cfg.assetsDir = 'assets';
        } else if (cfg.alloy) {
          cfg.assetsDir = path.join(cfg.alloyBase, 'assets');
        } else {
          cfg.assetsDir = 'Resources';
        }
      }

      next();
    },

    dpi: function (next) {

      // convert dpi constants
      cfg.minDpi = constants.dpi[cfg.minDpi] || parseInt(cfg.minDpi, 10);
      cfg.maxDpi = constants.dpi[cfg.maxDpi] || parseInt(cfg.maxDpi, 10);
      cfg.origDpi = (cfg.origDpi === undefined) ? undefined : (constants.dpi[cfg.origDpi] || parseInt(cfg.origDpi, 10));

      var validDpi = _.values(constants.dpi);

      if (validDpi.indexOf(cfg.minDpi) === -1) {
        return next('Invalid value `' + cfg.minDpi + '` for `min-dpi`.');
      }

      if (validDpi.indexOf(cfg.maxDpi) === -1) {
        return next('Invalid value `' + cfg.maxDpi + '` for `max-dpi`.');
      }

      if (cfg.origDpi !== undefined && validDpi.indexOf(cfg.origDpi) === -1) {
        return next('Invalid value `' + cfg.origDpi + '` for `orig-dpi`.');
      }

      next();
    },

    tiappxml: function (next) {

      if (!isProject) {
        return next();
      }

      fs.readFile(path.join(cfg.outputDir, 'tiapp.xml'), {
        encoding: 'utf-8'
      }, function (err, data) {

        if (!err) {
          tiappxml = data;
        }

        next();
      });

    },

    sdkVersion: function (next) {

      if (cfg.sdkVersion !== undefined) {
        return next();
      }

      if (tiappxml) {
        var match = tiappxml.match(/<sdk-version>([0-9]+\.[0-9]+\.[0-9]+)[^<]*<\/sdk-version>/);

        if (match) {
          cfg.sdkVersion = match[1];

          return next();
        }
      }

      cfg.sdkVersion = constants.sdkVersion;

      return next();
    },

    platformDir: function (next) {

      if (cfg.platformDir !== undefined) {
        return next();
      }

      if (!cfg.alloy || (cfg.sdkVersion !== undefined && semver.lt(cfg.sdkVersion, '5.2.0'))) {
        cfg.platformDir = 'platform';
      } else {
        cfg.platformDir = path.join(cfg.alloyBase, 'platform');
      }

      return next();
    },

    i18nDir: function (next) {

      if (cfg.i18nDir !== undefined) {
        return next();
      }

      if (!cfg.alloy || (cfg.sdkVersion !== undefined && semver.lt(cfg.sdkVersion, '5.2.0'))) {
        cfg.i18nDir = 'i18n';
      } else {
        cfg.i18nDir = path.join(cfg.alloyBase, 'i18n');
      }

      return next();
    },

    platforms: function (next) {

      if (cfg.platforms) {
        return next();
      }

      // get platforms from widgets
      // widget.json
      if (isWidget) {

        fs.readFile(path.join(cfg.outputDir, 'widget.json'), {
          encoding: 'utf-8'
        }, function (err, data) {

          if (err) {
            return next(err);
          }

          try {
            var widgetjson = JSON.parse(data);

            if (_.isObject(widgetjson) && widgetjson.platforms) {
              cfg.platforms = widgetjson.platforms;
            }

            next();

            // no widget.json
          } catch (err) {
            next(err);
          }

        });

      } else if (tiappxml) {
        var match;
        var deploymentTargets = [];
        var re = /<target[^>]+device="([a-z]+)"[^>]*>true<\/target>/gi;

        // add each deployment target
        while ((match = re.exec(tiappxml)) !== null) {
          deploymentTargets.push(match[1]);
        }

        // add apple watch
        if (/<extension/.test(tiappxml)) {
          deploymentTargets.push('apple-watch');
        }

        // use deployment targets
        if (_.size(deploymentTargets) > 0) {
          cfg.platforms = deploymentTargets;

          // use all
        } else {
          cfg.platforms = _.clone(constants.platforms);
        }

        next();

      } else {
        next();
      }
    },

    platformsClean: function (next) {

      if (!cfg.platforms) {
        cfg.platforms = 'all';
      }

      if (_.isString(cfg.platforms)) {

        // use all
        if (cfg.platforms === 'all') {
          cfg.platforms = _.clone(constants.platforms);

          // split
        } else {
          cfg.platforms = cfg.platforms.split(',');
        }
      }

      // convert platforms to short-hand flags
      _.each(constants.platforms, function (platform) {
        cfg[platform] = _.indexOf(cfg.platforms, platform) !== -1;
      });

      if (cfg.ios) {
        cfg.iphone = cfg.ipad = true;
      } else {
        cfg.ios = cfg.iphone || cfg.ipad;
      }

      next();
    },

    orientation: function (next) {

      // no orientation
      if (!cfg.orientation && cfg.type === 'splash') {
        var orientation, match;

        // tiapp.xml found
        if (tiappxml) {

          // mobileweb
          if (cfg.mobileweb) {

            // always mixed
            orientation = 'all';
          }

          // iphone
          if (cfg.iphone && orientation !== 'all') {

            // splash is always portrait on iphone
            orientation = 'portrait';
          }

          // ipad
          if (cfg.ipad && orientation !== 'all') {
            var landscape = !!tiappxml.match(/UISupportedInterfaceOrientations~ipad((?!~iphone)[\s\S])+UIInterfaceOrientationLandscape/);
            var portrait = !!tiappxml.match(/UISupportedInterfaceOrientations~ipad((?!~iphone)[\s\S])+UIInterfaceOrientationPortrait/);

            if (landscape !== portrait) {
              orientation = landscape ? 'landscape' : 'portrait';
            } else {
              orientation = 'all';
            }
          }

          // android
          if (cfg.android && orientation !== 'all') {

            // main activity locked
            if ((match = tiappxml.match(/android:screenOrientation="(landscape|portrait)"((?!<activity)[\s\S])+android.intent.action.MAIN/))) {

              if (!orientation) {
                orientation = match[1];
              } else if (orientation !== match[1]) {
                orientation = 'all';
              }
            }
          }

          // blackberry
          if (cfg.blackberry && orientation !== 'all') {

            // locked
            if ((match = tiappxml.match(/<blackberry>[\s\S]*<orientation>(landscape|portrait)<\/orientation>[\s\S]*<\/blackberry>/))) {

              if (!orientation) {
                orientation = match[1];
              } else if (orientation !== match[1]) {
                orientation = 'all';
              }
            }
          }
        }

        // orientation locked for all platforms
        if (orientation && orientation !== 'all') {
          cfg.orientation = orientation;
        }

        // all
      } else if (cfg.orientation === 'all') {
        cfg.orientation = undefined;
      }

      next();
    },

    resolveInput: function (next) {

      if (!cfg.input) {
        return next();
      }

      fs.realpath(cfg.input, function (err, resolvedPath) {

        if (err) {
          return next(err);
        }

        cfg.input = resolvedPath;

        next();
      });

    },

    detectInput: function (next) {

      // no input
      if (cfg.type && !cfg.input) {
        var potentialDefs = [];

        if (cfg.type === 'asset') {
          potentialDefs.push(path.join(cfg.outputDir, cfg.assetsDir, 'android', 'images', 'res-xxxhdpi'));
          potentialDefs.push(path.join(cfg.outputDir, cfg.assetsDir, 'iphone', 'images'));
          potentialDefs.push(path.join(cfg.outputDir, cfg.assetsDir, 'android', 'images', 'res-xxhdpi'));

        } else {

          if (cfg.storyboard && _.difference(cfg.platforms, ['ios', 'iphone', 'ipad']).length === 0) {
            potentialDefs.push(path.join(cfg.outputDir, cfg.assetsDir, 'iphone', 'LaunchLogo@2x~ipad.png'));
            potentialDefs.push(path.join(cfg.outputDir, cfg.assetsDir, 'iphone', 'LaunchLogo@3x~iphone.png'));
          }

          potentialDefs.push(path.join(cfg.outputDir, 'DefaultIcon.png'));
          potentialDefs.push(path.join(cfg.outputDir, cfg.assetsDir, 'iphone', 'iTunesArtwork@2x'));
        }

        async.detectSeries(potentialDefs, function (potentialDef, next) {

          fs.exists(potentialDef, function (exists) {

            if (exists) {
              cfg.input = potentialDef;
            }

            next(exists);

          });

        }, function (result) {

          if (!result) {
            return next('missing required argument `input` or one of the default paths');
          }

          next();

        });

      } else {
        next();
      }
    },

    sizeInput: function (next) {

      if (cfg.type === 'asset') {
        return next();
      }

      if (cfg.cli) {
        logger.info('Reading input dimensions');
      }

      var im = gm.subClass({
        imageMagick: true
      });

      // read input
      im(cfg.input).ping().size(function (err, size) {

        if (err) {
          return next(err.code === 'ENOENT' ? 'Please install ImageMagick.' : err);
        }

        cfg.inputWidth = size.width;
        cfg.inputHeight = size.height;

        next();
      });
    },

    ratio: function (next) {

      if (cfg.inputWidth && cfg.inputHeight) {
        cfg.inputRatio = cfg.inputWidth / cfg.inputHeight;
      }

      next();
    }

  }, function (err) {

    if (err) {
      return callback(err);
    }

    // display cfg
    if (cfg.trace) {
      logger.debug('Initialized config:');
      utils.prettyJSON(_.omit(cfg, '__cfg'));
      console.log();
    }

    // pass back cfg
    callback(null, cfg);

  });

};
