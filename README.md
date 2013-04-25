[![build status](https://secure.travis-ci.org/jmreidy/grunt-browserify.png)](http://travis-ci.org/jmreidy/grunt-browserify)
# grunt-browserify

Grunt task for node-browserify. Current version: 0.2.x.

## Getting Started
This plugin requires [Grunt](https://gruntjs.com) `~0.4.0` and Node `>=0.10.x`.

Install this grunt plugin with:

```shell
npm install grunt-browserify —save-dev
```

Then add this line to your project's `grunt.js` Gruntfile:

```javascript
grunt.loadNpmTasks('grunt-browserify');
```



## Documentation
Run this task with the `grunt browserify` command. As with other Grunt plugins, the `src` and `dest` properties are most important: `src` will use the Grunt glob pattern to specify files for inclusion in the browserified package, and `dest` will specify the outfile for the compiled module.

### Options
#### ignore
Type: `[String]`

Specifies files to be ignored in the browserify bundle.

#### alias
Type: `[String:String]` or comma-separated `String`

Browserify can alias files to a certain name. For example, `require(‘./foo’)` can be aliased to be used as `require(‘foo’)`. Aliases should be specified as `fileName:alias`.

#### external
Type: `[String]`

Specifies files to be loaded from a previously loaded, “common” bundle.

#### externalize
Type: `[String]`

Specifies files that should be able to be loaded from another module. Basically, provides the source modules for consumption from `external` above.

#### debug
Type: `Boolean`

Enable source map support.

###Usage
To get things running, add the following entry to `grunt.initConfig()`:

```javascript
    browserify: {
      src: [‘client/scripts/**/*.js`],
      dest: ‘build/module.js’
	}
```
More complicated use cases can be found within this projects own `Gruntfile`.


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using `grunt`.

## Release History

### v0.1.0
  - Initial release

### v0.1.1
  - Properly support compact and full grunt task syntax

### v0.2.0
  - Add support for Browserify 2

## License
Copyright (c) 2013 Justin Reidy
Licensed under the MIT license.


