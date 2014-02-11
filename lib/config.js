var path = require('path'),
  fs = require('fs'),
  _ = require('underscore'),
  constants = require('./constants');

/**
 * Intitializes config based on options
 * @param  {Object}   opts     options
 * @param  {Function} callback callback(err, cfg)
 */
module.exports = function config(opts, callback) {

  // already done
  if (opts && opts.__cfg) {
    return callback(null, opts);
  }

  var cfg = _.extend({
    __cfg: true,

    cli: false,
    input: null,
    targets: null,

    // TODO: implement
    //overwrite: true,
    //minDpi: null,
    //maxDpi: null,
    //radius: 0,
    //locale: null,

    orientation: null,
    fix: true,
    outputDir: null,
    assetsDir: null,
    alloy: null

  }, opts || {});

  /* set `overwrite` by negative CLI option
  if (cfg.noOverwrite) {
    cfg.fix = false;
  }*/

  // set `fix` by negative CLI option
  if (cfg.noFix) {
    cfg.fix = false;
  }

  // no outputDir given
  if (!cfg.outputDir) {

    // CWD is no project
    if (!fs.existsSync(path.join(process.cwd(), 'tiapp.xml'))) {
      return callback('either specify `outputDir` or run in a project root');
    }

    cfg.outputDir = process.cwd();
  }

  // no `alloy` set
  if (cfg.alloy === null) {

    // set `alloy` by negative CLI option
    if (cfg.classic) {
      cfg.alloy = false;
    }

    // detect Alloy
    else {
      cfg.alloy = fs.existsSync(path.join(cfg.outputDir, 'app', 'config.json'));
    }
  }

  // set assetsDir
  if (!cfg.assetsDir) {
    cfg.assetsDir = cfg.alloy ? path.join('app', 'assets') : 'Resources';
  }

  var tiappxml, match;

  // no targets
  if (!cfg.targets) {
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
      cfg.targets = deploymentTargets;
    }

    // use all
    else {
      cfg.targets = _.clone(constants.targets);
    }
  }

  // split targets if given as string
  else if (_.isString(cfg.targets)) {
    cfg.targets = cfg.targets.split(',');
  }

  // convert targets to short-hand flags
  _.each(constants.targets, function(target) {
    cfg[target] = _.indexOf(cfg.targets, target) !== -1;
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

    // orientation locked for all targets
    if (portrait !== landscape) {
      cfg.orientation = landscape ? 'landscape' : 'portrait';
    }
  }

  // pass back cfg
  callback(null, cfg);
};