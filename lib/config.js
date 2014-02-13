var path = require('path'),
  fs = require('fs'),
  _ = require('underscore'),
  constants = require('./constants'),
  logger = require('./logger'),
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

  // convert CLI negative
  if (opts.classic) {
    opts.alloy = !opts.classic;
    delete opts.classic;
  }

  var cfg = _.extend({
    __cfg: true,

    cli: false,
    input: undefined,
    platforms: undefined,
    radius: 0,
    locale: undefined,
    minDpi: undefined,
    maxDpi: undefined,
    orientation: undefined,
    fix: true,
    nine: true,
    outputDir: undefined,
    assetsDir: undefined,
    alloy: undefined,
    trace: false

  }, opts);

  // validate radius
  if (cfg.radius !== 0 && (_.isNumber(cfg.radius) || cfg.radius < 0 || cfg.radius > 50)) {
    return callback('The `radius` percentage should be between 0 and 50.');
  }

  // no outputDir given
  if (!cfg.outputDir) {

    // CWD is no project
    if (!fs.existsSync(path.join(process.cwd(), 'tiapp.xml'))) {
      return callback('Either specify `outputDir` or run in a project root');
    }

    cfg.outputDir = process.cwd();
  }

  // detect Alloy
  if (cfg.alloy === undefined) {
    cfg.alloy = fs.existsSync(path.join(cfg.outputDir, 'app', 'config.json'));
  }

  // set assetsDir
  if (!cfg.assetsDir) {
    cfg.assetsDir = cfg.alloy ? path.join('app', 'assets') : 'Resources';
  }

  // convert dpi constants
  if (cfg.minDpi && !_.isNumber(cfg.minDpi)) {
    cfg.minDpi = constants.dpi[cfg.minDpi] || undefined;
  }
  if (cfg.maxDpi && !_.isNumber(cfg.maxDpi)) {
    cfg.maxDpi = constants.dpi[cfg.maxDpi] || undefined;
  }

  var tiappxml, match;

  // no platforms
  if (!cfg.platforms) {
    var deploymentTargets = [];

    // tiapp.xml found
    try {

      // convert to string
      tiappxml = '' + fs.readFileSync(path.join(cfg.outputDir, 'tiapp.xml'));

      var re = /<target[^>]+device="([a-z]+)"[^>]*>true<\/target>/gi;

      // add each deployment target
      while ((match = re.exec(tiappxml)) !== null) {
        deploymentTargets.push(match[1]);
      }
    }

    // no tiapp.xml
    catch (err) {}

    // use deployment targets
    if (_.size(deploymentTargets) > 0) {
      cfg.platforms = deploymentTargets;
    }

    // use all
    else {
      cfg.platforms = _.clone(constants.platforms);
    }
  }

  // parse string
  else if (_.isString(cfg.platforms)) {

    // use all
    if (cfg.platforms === 'all') {
      cfg.platforms = _.clone(constants.platforms);
    }

    // split
    else {
      cfg.platforms = cfg.platforms.split(',');
    }
  }

  // convert platforms to short-hand flags
  _.each(constants.platforms, function(platform) {
    cfg[platform] = _.indexOf(cfg.platforms, platform) !== -1;
  });
  cfg.iphone = (cfg.iphone === true) || !! cfg.ios;
  cfg.ipad = (cfg.ipad === true) || !! cfg.ios;
  cfg.ios = (cfg.ios === true) || (cfg.iphone && cfg.ipad);

  // no orientation
  if (!cfg.orientation) {
    var portrait = false,
      landscape = false;

    // tiapp.xml found
    try {

      // convert to string
      tiappxml = tiappxml || '' + fs.readFileSync(path.join(cfg.outputDir, 'tiapp.xml'));

      // ipad targetted
      if (cfg.ipad) {
        landscape = !! tiappxml.match(/UISupportedInterfaceOrientations~ipad((?!~iphone)[\s\S])+UIInterfaceOrientationLandscape/);
        portrait = !! tiappxml.match(/UISupportedInterfaceOrientations~ipad((?!~iphone)[\s\S])+UIInterfaceOrientationPortrait/);
      }

      // android targetted
      if (cfg.android && landscape === portrait) {

        // main activity locked
        if ((match = tiappxml.match(/android:screenOrientation="(landscape|portrait)">((?!<activity)[\s\S])+android.intent.action.MAIN/))) {

          // get orientation
          if (match[1] === 'landscape') {
            landscape = true;
          } else {
            portrait = true;
          }
        }
      }

      // blackberry targetted
      if (cfg.blackberry && landscape === portrait) {

        // locked
        if ((match = tiappxml.match(/<blackberry>[\s\S]*<orientation>(landscape|portrait)<\/orientation>[\s\S]*<\/blackberry>/))) {

          // get orientation
          if (match[1] === 'landscape') {
            landscape = true;
          } else {
            portrait = true;
          }
        }
      }
    }

    // no tiapp.xml
    catch (err) {}

    // orientation locked for all platforms
    if (portrait !== landscape) {
      cfg.orientation = landscape ? 'landscape' : 'portrait';
    }
  }

  // all
  else if (cfg.orientation === 'all') {
    cfg.orientation = undefined;
  }

  // display cfg
  if (cfg.cli && cfg.trace) {
    logger.debug('Initialized config:');
    utils.prettyJSON(_.omit(cfg, '__cfg'));
    console.log();
  }

  // pass back cfg
  callback(null, cfg);
};