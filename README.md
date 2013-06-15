[![build status](https://secure.travis-ci.org/jmreidy/grunt-browserify.png)](http://travis-ci.org/jmreidy/grunt-browserify)
# grunt-browserify

Grunt task for node-browserify. Current version: 1.0.0.

## Getting Started
This plugin requires [Grunt](https://gruntjs.com) `~0.4.0` and Node `>=0.10.x`.

Install this grunt plugin with:

```shell
npm install grunt-browserify --save-dev
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

#### aliasMappings
Type: `[Object || Array]`

Like the `alias` option described above, but accepts mapping patterns as described in [Building the files object dynamically](http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically) to enable aliasing of entire
directories and sets of files. Note that the `expand` option is set to `true` for you,
so you can omit that from your configuration.

#### external
Type: `[String]`

Specifies files to be loaded from a previously loaded, “common” bundle.

#### externalize
Type: `[String]`

Specifies modules(s) to be exposed outside of a bundle, which is necessary for building "common" bundles which can be loaded via the `external` option above. Basically, it's a list of files which are supplied to browserify via its `require` or `-r` command.

#### transform
Type: `[String || Function]`

Specifies a pipeline of functions (or modules) through which the browserified bundle will be run. The [browserify docs themselves](https://github.com/substack/node-browserify#btransformtr) explain transform well, but below is an example of transform used with `grunt-browserify` to automatically compile coffeescript files for use in a bundle:

```javascript
browserify: {
  'build/module.js': ['client/scripts/**/*.js', 'client/scripts/**/*.coffee'],
  options: {
    transform: ['coffeeify']
  }
}
```

#### debug
Type: `Boolean`

Enable source map support.

#### shim
Type: `Object`

Provide a config object to be used with [browserify-shim](https://github.com/thlorenz/browserify-shim)

#### Other Options

Any other options you provide will be passed through to browserify. This is useful for setting things like `standalone` or `ignoreGlobals`.

###Usage
To get things running, add the following entry to `grunt.initConfig()`:

```javascript
browserify: {
  'build/module.js': ['client/scripts/**/*.js']
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

### v0.2.4
  - Add externalize option, to expose modules to external bundles
  - Add browserify-shim support
  - Completely rewrote and significantly improved tests
  - Various fixes

### v0.2.5
  - Update externalize to expose npm modules to external bundles

### v1.0.0
  - Really should've been released at v0.2, but better late than never!

### v1.0.2
  - Move away from browserify-stream to callback approach

### v1.0.3
  - Add new aliasMappings functionality

### v1.0.4
  - Adding directory support for `external` parameter

### v1.0.5
  - Bumping to latest Browserify (2.18.x)

## Frequent Contributors
  - Ben Clinkinbeard ([@bclinkinbeard](https://github.com/bclinkinbeard))
  - Kyle Robinson Young ([@shama](https://github.com/shama))

## License
Copyright (c) 2013 Justin Reidy
Licensed under the MIT license.



