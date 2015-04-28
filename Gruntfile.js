module.exports = function(grunt) {

  grunt.initConfig({
    cfg: {
      test: grunt.option('test') || '*'
    },
    mochaTest: {
      options: {
        require: ['should'],
        timeout: 3000,
        ignoreLeaks: false,
        reporter: 'spec'
      },
      src: ['test/<%= cfg.test %>.js']
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('test', ['mochaTest']);

  grunt.registerTask('default', ['test']);
};