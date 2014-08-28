module.exports = function (grunt) {
  grunt.initConfig({
    browserify: {
      vendor: {
        src: [],
        dest: 'public/vendor.js',
        options: {
          require: ['jquery'],
          alias: [
            './lib/moments.js:momentWrapper', //can alias file names
            'events:evt' //can alias modules
          ]
        }
      },
      client: {
        src: ['client/**/*.js'],
        dest: 'public/app.js',
        options: {
          external: ['jquery', 'momentWrapper'],
        }
      }
    },

    concat: {
      'public/main.js': ['public/vendor.js', 'public/app.js']
    }
  });

  grunt.loadTasks('../../tasks');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('default', ['browserify', 'concat']);

};
