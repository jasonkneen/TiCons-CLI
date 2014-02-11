module.exports = function(grunt) {

  grunt.initConfig({
    mochaTest: {
      options: {
        require: ['should'],
        timeout: 3000,
        ignoreLeaks: false,
        reporter: 'spec'
      },
      src: ['test/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('test', ['mochaTest']);

  grunt.registerTask('default', ['test']);
};