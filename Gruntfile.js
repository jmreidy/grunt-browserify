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
        dest: 'tmp/ignores.js',
        options: {
          ignore: ['test/fixtures/ignore.js']
        }
      },

      alias: {
        src: ['test/fixtures/alias/*.js'],
        dest: 'tmp/alias.js', 
        options: {
          alias: ['test/fixtures/alias/toBeAliased.js:alias']
        }
      },

      aliasString: {
        src: ['test/fixtures/alias/*.js'],
        dest: 'tmp/aliasString.js',
        options: {
          alias: 'test/fixtures/alias/toBeAliased.js:alias',
        }
      },

      external: {
        src: ['test/fixtures/*.js'],
        dest: 'tmp/external.js',
        options: {
          external: ['test/fixtures/a.js']
        }
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
