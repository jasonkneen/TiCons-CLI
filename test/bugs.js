var should = require('should'),
	path = require('path'),
	fs = require('fs-extended'),
	_ = require('underscore'),
	sizeOf = require('image-size'),
	ticons = require('../'),
	jobs = require('../lib/jobs');

var tmpDir = path.join(__dirname, '..', 'tmp');

describe('bugs', function() {
	this.timeout(20000);

	beforeEach(function() {
		fs.createDir(tmpDir, 0755);
	});

	describe('Invalid value for `min-dpi`', function() {

		it('should handle strings for min-dpi', function(done) {

			ticons.splashes({
				input: path.join(__dirname, 'icon.png'),
				outputDir: tmpDir,
				platforms: ['ios'],
				orientation: 'landscape',
				minDpi: '160'
			}, function(err, output) {

				if (err) {
					return done(new Error(err));
				}

				done();
			});

		});

	});

	describe('#31 - Splashes are square', function() {

		it('should crop square input', function(done) {

			ticons.splashes({
				input: path.join(__dirname, 'icon.png'),
				outputDir: tmpDir,
				platforms: ['ios'],
				orientation: 'landscape'
			}, function(err, output) {

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

	});

	describe('#47 - --platforms iphone,ipad,android Not working for android', function() {

		it('should select portrait nine, even in landscape', function(done) {

			var specs = jobs.getSpecs({
				outputDir: '.',
				input: path.join(__dirname, 'splash.png'),
				orientation: 'landscape',
				type: 'splash',
				platforms: ['android']
			}, function(err, specs) {

				if (err) {
					return done(new Error(err));
				}

				should(specs['android-default-notlong-port-mdpi']).be.an.Object;

				done();
			});

		});

	});

	afterEach(function() {
		fs.deleteDirSync(tmpDir);
	});

});
