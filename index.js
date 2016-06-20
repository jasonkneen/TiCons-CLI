// jscs:disable jsDoc
'use strict';

var _ = require('underscore'),
  path = require('path'),
  fs = require('fs-extended'),
  async = require('async'),
  config = require('./lib/config'),
  constants = require('./lib/constants'),
  logger = require('./lib/logger'),
  jobs = require('./lib/jobs'),
  gm = require('gm');

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
 * Generates assets
 * @param  {Object}   opts     options
 * @param  {Function} callback callback(err, output)
 */
exports.assets = function(opts, callback) {
  opts = opts || {};
  opts.type = 'asset';

  // config
  config(opts, function(err, cfg) {

    if (err) {
      return callback(err);
    }

    var stat = fs.statSync(cfg.input);
    var files = [];

    var inputIsUnderOutput = cfg.input.indexOf(path.join(cfg.outputDir, cfg.assetsDir)) === 0;

    jobs.getSpecs(cfg, function(err, specs) {
      var outputSpecs = {};
      var inputSpec;

      _.each(specs, function(spec, name) {

        if (!inputSpec) {
          var re = new RegExp((spec.suffix || '') + '\.(png|jpg)$');

          // if input is not under output
          if (!inputIsUnderOutput) {

            // and the user has specified dpi
            if (cfg.origDpi) {

              // and this spec matches
              if (spec.dpi === cfg.origDpi) {
                inputSpec = spec;
              }

            } else {

              // if this spec has a suffix we can and do match
              if (spec.suffix && stat.isFile() && cfg.input.match(re)) {
                inputSpec = spec;
              }
            }

            // since our input is not under ouput, we need to override the output path
            if (inputSpec) {
              inputSpec = _.defaults({
                output: stat.isFile() ? path.dirname(cfg.input) : cfg.input
              }, inputSpec);
            }

          } else {

            // our input is under this specific spec path
            if (cfg.input.substr(0, spec.output.length) === spec.output) {

              // this spec has NO suffix we need to match as well
              if (!spec.suffix) {
                inputSpec = spec;
                return; // skip this spec as output
              }

              // the input is a file
              if (stat.isFile()) {

                // which matches the suffix
                if (cfg.input.match(re)) {
                  inputSpec = spec;
                  return; // skip this spec as output
                }

              } else {

                // see if there are files under the path that match the suffix
                var suffixFiles = fs.listFilesSync(cfg.input, {
                  recursive: true,
                  prependDir: true,
                  filter: function(itemPath, itemStat) {
                    return itemPath.match(re);
                  }
                });

                // there are
                if (suffixFiles.length > 0) {
                  inputSpec = spec;
                  return; // skip this spec as output
                }
              }
            }
          }
        }

        // include this spec in the output
        outputSpecs[name] = spec;
      });

      if (!inputSpec) {
        return callback('Could not identify input density.');
      }

      if (outputSpecs['android-res-mdpi'] && outputSpecs['ios-images']) {
        delete outputSpecs['android-res-mdpi'];
      }

      if (stat.isDirectory()) {

        files = fs.listFilesSync(cfg.input, {
          recursive: true,
          prependDir: true,
          filter: function(itemPath, itemStat) {

            // only filter on suffix if our input is in our output dir
            return itemPath.match(new RegExp(((!inputIsUnderOutput || !inputSpec.suffix) ? '' : inputSpec.suffix) + '\.(png|jpg)$'));
          }
        });

      } else {
        files.push(cfg.input);
      }

      if (files.length === 0) {
        return callback('Could not find input images.');
      }

      var tasks = [];

      _.each(files, function(source) {
        var sourceTime = fs.statSync(source).mtime;
        var relativePath = source.substr(inputSpec.output.length);

        // replace any suffixes from our source
        relativePath = relativePath.replace(/(?:@[0-9]x|~[a-z]+)(\.[a-z]+)$/, '$1');

        _.each(outputSpecs, function(spec, n) {

          if (spec.dpi > inputSpec.dpi) {
            logger.info('Skipped higher dpi: ' + spec.name.cyan);

            return;
          }

          var target = path.join(spec.output, relativePath);

          if (spec.suffix) {
            target = target.replace(/(\.(png|jpg)+)$/i, spec.suffix + '$1');
          }

          if (!fs.existsSync(target.replace(/(\.png)$/, '.9$1')) && (!fs.existsSync(target) || (sourceTime > fs.statSync(target).mtime))) {

            tasks.push(function(callback) {

              if (inputSpec.dpi === spec.dpi) {
                fs.copyFileSync(source, target);

                // async feedback for CLI
                if (cfg.cli) {
                  logger.info('Copied: ' + target.cyan);
                }

                return callback(null, target);
              }

              fs.createDirSync(path.dirname(target));

              var im = gm.subClass({
                imageMagick: true
              });

              // read
              var convert = im(source);

              // resize
              convert.in('-resize', ((spec.dpi / inputSpec.dpi) * 100) + '%');

              // show command
              if (cfg.trace) {
                logger.debug('Executing: ' + convert.args().join(' ').cyan);
              }

              convert.write(target, function(err) {

                if (err) {
                  return callback(err);
                }

                // async feedback for CLI
                if (cfg.cli) {
                  logger.info('Generated: ' + target.cyan);
                }

                // pass back output
                callback(null, target);

              });

              // show command
              if (cfg.trace && cfg.cli) {
                logger.debug('Executing: ' + convert.args().join(' ').cyan);
              }

            });

          }

        });

      });

      async.series(tasks, callback);
    });

  });

};
