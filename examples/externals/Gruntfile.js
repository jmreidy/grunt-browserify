module.exports = function (grunt) {
  grunt.initConfig({
    browserify: {
      common: {
        src: ['client/foo/*.js'],
        dest: 'public/common.js',
        options: {
          alias: 'client/foo/bar.js'
        }
      },
      client: {
        src: ['client/externals.js'],
        dest: 'public/app.js',
        options: {
          external: ["client/foo/bar.js"]
        }
      },
    },

    concat: {
      'public/main.js': ['public/common.js', 'public/app.js']
    }

  });

  grunt.loadTasks('../../tasks');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['browserify', 'concat']);
};
