module.exports = function (grunt) {
  grunt.initConfig({
    browserify: {
      client: {
        src: [
            './client/x.js',
            './client/y.js'
        ],
        dest: 'public/common.js',
        options: {
          plugin: [
            ['factor-bundle', { outputs: [ 'public/x.js', 'public/y.js'] }]
          ],
        }
      }
    }
  });

  grunt.loadTasks('../../tasks');
  grunt.registerTask('default', ['browserify']);
};