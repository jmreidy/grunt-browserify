module.exports = function (grunt) {
  'use strict';
  // Project configuration.
  grunt.initConfig({

    clean: {
      tests: ['tmp']
    },

    jshint: {
      all: ['Gruntfile.js', 'tasks/**/*.js', '<%= nodeunit.tests %>'],
      options: {
        curly: true,
        eqeqeq: true,
        es5: true,
        immed: true,
        indent: 2,
        latedef: true,
        newcap: true,
        noarg: true,
        node: true,
        nonew: true,
        sub: true,
        undef: true
      }
    },

    browserify: {
      basic: {
        src: ['test/fixtures/*.js'],
        dest: 'tmp/basic.js'
      },

      ignores: {
        src: ['test/fixtures/*.js'],
        ignore: ['test/fixtures/ignore.js'],
        dest: 'tmp/ignores.js'
      },

      alias: {
        src: ['test/fixtures/alias/*.js'],
        alias: ['test/fixtures/alias/toBeAliased.js:alias'],
        dest: 'tmp/alias.js'
      },

      aliasString: {
        src: ['test/fixtures/alias/*.js'],
        alias: 'test/fixtures/alias/toBeAliased.js:alias',
        dest: 'tmp/aliasString.js'
      },

      external: {
        src: ['test/fixtures/*.js'],
        external: ['test/fixtures/a.js'],
        dest: 'tmp/external.js'
      },

      sourceMaps: {
        src: ['test/fixtures/*.js'],
        dest: 'tmp/sourceMaps.js',
        options: {
          debug: true
        }
      }
    },

    nodeunit: {
      tests: ['test/*_test.js']
    }


  });

  // Load local tasks.
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Default task.
  grunt.registerTask('test', ['clean', 'browserify', 'nodeunit']);
  grunt.registerTask('default', ['jshint', 'test']);
};
