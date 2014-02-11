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
    //orientation: _.clone(orientations),
    //fix: true,

    outputDir: null,
    assetsDir: null,
    alloy: null

  }, opts || {});

  //cfg.overwrite = cfg.overwrite && !cfg.noOverwrite;
  //cfg.fix = cfg.fix && !cfg.noFix;

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

  // no targets
  if (!cfg.targets) {
    var deploymentTargets = [];

    // tiapp.xml found
    try {
      var tiappxml = fs.readFileSync(path.join(cfg.outputDir, 'tiapp.xml'));

      var re = /<target[^>]+device="([a-z]+)"[^>]*>true<\/target>/gi,
        match;

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

  // pass back cfg
  callback(null, cfg);
};