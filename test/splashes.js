var should = require('should'),
  _ = require('underscore'),
  path = require('path'),
  fs = require('fs-extended'),
  ticons = require('../');

var tmpDir = path.join(__dirname, '..', 'tmp');

describe('splashes', function() {

  describe('alloy', function() {
    this.timeout(20000);

    before(function() {
      fs.createDir(tmpDir, 0755);
    });

    it('generates 29 files', function(done) {

      ticons.splashes({
        input: path.join(__dirname, 'splash.png'),
        outputDir: tmpDir,
        alloy: true
      }, function(err, output) {

        if (err) {
          return done(new Error(err));
        }

        _.size(output).should.be.equal(29);

        should(_.every(output, function(output, name) {
          return fs.existsSync(output);
        })).be.true;

        done();

      });

    });

    after(function() {
      fs.deleteDirSync(tmpDir);
    });

  });

});