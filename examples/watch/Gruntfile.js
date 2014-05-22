module.exports = function (grunt) {
  grunt.initConfig({
    browserify: {
      vendor: {
        src: [],
        dest: 'public/vendor.js',
        options: {
          require: ['jquery'],
          alias: ['./lib/moments.js:momentWrapper']
        }
      },

      //standalone browserify watch - do NOT use with grunt-watch
      client: {
        src: ['client/**/*.js'],
        dest: 'public/app.js',
        options: {
          external: ['jQuery', 'momentWrapper'],
          watch: true,
          keepAlive: true
        }
      },

      //working with grunt-watch - do NOT use with keepAlive above
      watchClient: {
        src: ['client/**/*.js'],
        dest: 'public/app.js',
        options: {
          external: ['jQuery', 'momentWrapper'],
          watch: true
        }
      }
    },

    concat: {
      'public/main.js': ['public/vendor.js', 'public/app.js']
    },

    watch: {
      concat: {
        //note that we target the OUTPUT file from watchClient, and don't trigger browserify
        //the module watching and rebundling is handled by watchify itself
        files: ['public/app.js'],
        tasks: ['concat']
      },
    }
  });

  grunt.loadTasks('../../tasks');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['browserify:vendor', 'browserify:client', 'concat']);
  grunt.registerTask('browserifyWithWatch', [
    'browserify:vendor',
    'browserify:watchClient',
    'watch:concat'
  ]);
};
