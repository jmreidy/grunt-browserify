module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      watch: {
        files: [{
          expand: true,     // Enable dynamic expansion.
          src: ['*.app.js'], // Actual pattern(s) to match.
          ext: '.min.js',   // Dest filepaths will have this extension.
          extDot: 'first'   // Extensions in filenames begin after the first dot
        }],
        options: {
          watch: true,
          keepAlive: true
        }
      },
      dist: {
        files: [{
          expand: true,     // Enable dynamic expansion.
          src: ['*.app.js'], // Actual pattern(s) to match.
          ext: '.min.js',   // Dest filepaths will have this extension.
          extDot: 'first'   // Extensions in filenames begin after the first dot
        }]
      }
    }
  });

  grunt.loadTasks('../../tasks');
};