var should = require('should'),
  _ = require('underscore'),
  jobs = require('../lib/jobs');

describe('jobs', function() {

  describe('#getSpec', function() {

    it('exist', function() {
      jobs.getSpec.should.be.an.Function;
    });

    it('pass back an object with `ios-iTunesArtwork` spec', function(done) {

      jobs.getSpec('ios-iTunesArtwork', {
        outputDir: '.'
      }, function(err, spec) {

        if (err) {
          return done(new Error(err));
        }

        spec.should.be.an.Object;
        spec.should.be.eql({
          type: 'icon',
          path: ':assets:/iphone/iTunesArtwork',
          size: 512,
          height: 512,
          width: 512,
          platforms: [
            "ios"
          ],
          name: "ios-iTunesArtwork",
          dpi: 72,
          output: "Resources/iphone/iTunesArtwork"
        });

        done();
      });
    });

  });

  describe('#getSpecs', function() {

    it('exist', function() {
      jobs.getSpecs.should.be.an.Function;
    });

    it('pass back an object with only iPad and Android specs', function(done) {

      var specs = jobs.getSpecs({
        outputDir: '.',
        platforms: ['ipad', 'android']
      }, function(err, specs) {

        if (err) {
          return done(new Error(err));
        }

        specs.should.be.an.Object.and.not.be.empty;

        should(_.every(specs, function(spec) {
          return _.indexOf(spec.platforms, 'ipad') !== -1 || _.indexOf(spec.platforms, 'ios') !== -1 || _.indexOf(spec.platforms, 'android') !== -1;
        })).is.true;

        should(_.some(specs, function(spec) {
          return _.indexOf(spec.platforms, 'ipad') !== -1 || _.indexOf(spec.platforms, 'ios') !== -1;
        })).is.true;

        should(_.some(specs, function(spec) {
          return _.indexOf(spec.platforms, 'android') !== -1;
        })).is.true;

        done();
      });
    });

  });

  describe('#createTask', function() {

    it('exist', function() {
      jobs.createTask.should.be.an.Function;
    });

    it('pass back a function', function(done) {

      jobs.createTask('ios-iTunesArtwork', {
        outputDir: '.'
      }, function(err, task) {

        if (err) {
          return done(new Error(err));
        }

        task.should.be.an.Function;

        done();
      });
    });

  });

  describe('#createTasks', function() {

    it('exist', function() {
      jobs.createTask.should.be.an.Function;
    });

    it('pass back an object', function(done) {

      jobs.createTasks({
        outputDir: '.',
        ios: true
      }, function(err, tasks) {

        if (err) {
          return done(new Error(err));
        }

        tasks.should.be.an.Object;

        done();
      });
    });

  });

});