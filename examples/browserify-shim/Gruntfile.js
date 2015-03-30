module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      dist: {
        src: ['src/app.js'],
        dest: 'build/target.js'
        // Note: The entire `browserify-shim` config is inside `package.json`.
      }
    }
  });

  grunt.loadTasks('../../tasks');
};