var should = require('should'),
	path = require('path'),
	fs = require('fs-extended'),
	_ = require('underscore'),
	sizeOf = require('image-size'),
	ticons = require('../');

var tmpDir = path.join(__dirname, '..', 'tmp');

describe('bugs', function () {

	describe('#31 - Splashes are square', function () {
		this.timeout(20000);

		before(function () {
			fs.createDir(tmpDir, 0755);
		});

		it('should crop square input', function (done) {

			ticons.splashes({
				input: path.join(__dirname, 'icon.png'),
				outputDir: tmpDir
			}, function (err, output) {

				if (err) {
					return done(new Error(err));
				}

				var firstPath = _.values(output)[0];
				var dimensions = sizeOf(firstPath);

				should(dimensions).be.an.Object;
				dimensions.width.should.be.a.Number;
				dimensions.height.should.be.a.Number;
				dimensions.width.should.not.eql(dimensions.height);

				done();
			});

		});

		after(function () {
			fs.deleteDirSync(tmpDir);
		});

	});

});
