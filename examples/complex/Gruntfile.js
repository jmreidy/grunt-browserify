module.exports = function (grunt) {
  grunt.initConfig({
    browserify: {
      vendor: {
        src: ['vendor/client/**/*.js'],
        dest: 'public/vendor.js',
        options: {
          shim: {
            jQuery: {
              path: 'vendor/client/jQuery.js',
              exports: '$'
            }
          }
        }
      },
      client: {
        src: ['client/**/*.js'],
        dest: 'public/app.js',
        options: {
          alias: ["vendor/client/jQuery.js:jQuery"], //for every ref to vendor/client/jQuery, replace with require('jQuery')
          external: ["vendor/client/jQuery.js"] //don't actually include vendor/client/jQuery in the bundle
        }
      },
    },

    concat: {
      'public/main.js': ['public/vendor.js', 'public/app.js']
    }

  });

  grunt.loadTasks('../../tasks');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['browserify', 'concat']);
};
