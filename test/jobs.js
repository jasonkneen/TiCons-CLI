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
          path: 'iphone/iTunesArtwork',
          size: 512,
          dpi: 72,
          "targets": [
            "ios"
          ]
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
        targets: ['ipad', 'android']
      }, function(err, specs) {

        if (err) {
          return done(new Error(err));
        }

        specs.should.be.an.Object;
        specs.should.not.be.empty;

        should(_.every(specs, function(spec) {
          return _.indexOf(spec.targets, 'ipad') !== -1 || _.indexOf(spec.targets, 'ios') !== -1 || _.indexOf(spec.targets, 'android') !== -1;
        })).is.true;

        should(_.some(specs, function(spec) {
          return _.indexOf(spec.targets, 'ipad') !== -1 || _.indexOf(spec.targets, 'ios') !== -1;
        })).is.true;

        should(_.some(specs, function(spec) {
          return _.indexOf(spec.targets, 'android') !== -1;
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

        tasks.should.be.an.Array;

        done();
      });
    });

  });

});