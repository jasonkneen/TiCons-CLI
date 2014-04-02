var path = require('path'),
  fs = require('fs'),
  _ = require('underscore'),
  constants = require('./constants'),
  gm = require('gm'),
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
    locale: undefined,
    minDpi: undefined,
    maxDpi: undefined,
    orientation: undefined,
    fix: true,
    nine: true,
    crop: true,
    outputDir: undefined,
    assetsDir: undefined,
    alloy: undefined,
    trace: false,
    inputWidth: undefined,
    inputHeight: undefined,
    inputRatio: undefined

  }, opts);

  // validate radius
  if (cfg.radius !== 0) {
    cfg.radius = parseInt(cfg.radius, 10);

    if (cfg.radius < 0 || cfg.radius > 50) {
      return callback('The `radius` percentage should be between 0 and 50.');
    }
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

  if (cfg.ios) {
    cfg.iphone = cfg.ipad = true;
  } else {
    cfg.ios = cfg.iphone || cfg.ipad;
  }

  // no orientation
  if (!cfg.orientation && cfg.type === 'splash') {
    var orientation;

    // tiapp.xml found
    try {

      // convert to string
      tiappxml = tiappxml || '' + fs.readFileSync(path.join(cfg.outputDir, 'tiapp.xml'));

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
        var landscape = !! tiappxml.match(/UISupportedInterfaceOrientations~ipad((?!~iphone)[\s\S])+UIInterfaceOrientationLandscape/);
        var portrait = !! tiappxml.match(/UISupportedInterfaceOrientations~ipad((?!~iphone)[\s\S])+UIInterfaceOrientationPortrait/);

        if (landscape != portrait) {
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

    // no tiapp.xml
    catch (err) {}

    // orientation locked for all platforms
    if (orientation && orientation !== 'all') {
      cfg.orientation = orientation;
    }
  }

  // all
  else if (cfg.orientation === 'all') {
    cfg.orientation = undefined;
  }

  // no input
  if (cfg.type && (!cfg.input || fs.existsSync(cfg.input))) {
    var def;

    if (cfg.type === 'asset') {
      def = path.join(cfg.outputDir, cfg.assetsDir, 'iphone', 'images');
    } else {
      def = path.join(cfg.outputDir, cfg.assetsDir, 'iphone', (cfg.type === 'splash') ? 'Default-568h@2x.png' : 'iTunesArtwork@2x');
    }

    // use default
    if (fs.existsSync(def)) {
      cfg.input = def;
    } else {
      return callback('missing required argument `input` or default: ' + def);
    }
  }

  // requires original dimensions
  if (cfg.type === 'splash' && (!cfg.inputWidth || !cfg.inputHeight) && (!cfg.crop || (cfg.nine && _.indexOf(cfg.platforms, 'android') !== -1))) {

    if (cfg.cli) {
      logger.info('Reading input dimensions');
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

      finish(cfg, callback);
    });

  } else {
    finish(cfg, callback);
  }
};

function finish(cfg, callback) {

  // calculate ratio
  if (cfg.inputWidth && cfg.inputHeight) {
    cfg.inputRatio = cfg.inputWidth / cfg.inputHeight;
  }

  // display cfg
  if (cfg.cli && cfg.trace) {
    logger.debug('Initialized config:');
    utils.prettyJSON(_.omit(cfg, '__cfg'));
    console.log();
  }

  // pass back cfg
  callback(null, cfg);
}