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
        src: ['test/fixtures/basic/*.js'],
        dest: 'tmp/basic.js'
      },

      ignores: {
        src: ['test/fixtures/ignore/*.js'],
        dest: 'tmp/ignores.js',
        options: {
          ignore: ['test/fixtures/ignore/ignore.js']
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
          alias: 'test/fixtures/alias/toBeAliased.js:alias'
        }
      },

      aliasMappings: {
        src: ['test/fixtures/aliasMappings/**/*.js'],
        dest: 'tmp/aliasMappings.js',
        options: {
          aliasMappings: [
            {
              cwd: 'test/fixtures/aliasMappings/',
              src: ['**/*.js'],
              dest: 'tmp/shortcut/',
              flatten: true
            },
            {
              cwd: 'test/fixtures/aliasMappings/foo/',
              src: ['**/*.js'],
              dest: 'tmp/other/'
            }
          ]
        }
      },

      external: {
        src: ['test/fixtures/external/*.js'],
        dest: 'tmp/external.js',
        options: {
          external: ['test/fixtures/external/a.js']
        }
      },

      'external-dir': {
        src: ['test/fixtures/external-dir/*.js'],
        dest: 'tmp/external-dir.js',
        options: {
          external: ['test/fixtures/external-dir/b']
        }
      },

      externalize: {
        src: ['test/fixtures/externalize/b.js'],
        dest: 'tmp/externalize.js',
        options: {
          externalize: ['test/fixtures/externalize/a.js', 'events']
        }
      },

      shim: {
        src: ['test/fixtures/shim/a.js', 'test/fixtures/shim/shim.js'],
        dest: 'tmp/shim.js',
        options: {
          shim: {
            jquery: {
              path: 'test/fixtures/shim/jquery.js',
              exports: 'jquery'
            }
          }
        }
      },

      sourceMaps: {
        src: ['test/fixtures/basic/*.js'],
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
