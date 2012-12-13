[![build status](https://secure.travis-ci.org/pix/grunt-browserify.png)](http://travis-ci.org/pix/grunt-browserify)
# grunt-browserify

Grunt task for node-browserify

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-browserify`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-browserify');
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

## Documentation

### Settings

* <tt>ignore</tt> - array, optional - files to [ignore](https://github.com/substack/node-browserify/blob/master/doc/methods.markdown#bignorefile)
* <tt>requires</tt> - array, optional - modules to [require](https://github.com/substack/node-browserify/blob/master/doc/methods.markdown#brequirefile)
* <tt>aliases</tt> - array, optional - aliases in form <tt>to:from1:from2</tt>, see [bundle.alias](https://github.com/substack/node-browserify/blob/master/doc/methods.markdown#baliasto-from)
* <tt>src</tt> - array - files or file patterns to browserify. Alias <tt>entries</tt>
* <tt>prepend</tt> - array, optional - files or file patterns to [prepend](https://github.com/substack/node-browserify/blob/master/doc/methods.markdown#bprependcontent)
* <tt>append</tt> - array, optional - files or file patterns to [append](https://github.com/substack/node-browserify/blob/master/doc/methods.markdown#bappendcontent)
* <tt>hook</tt> - function, optional - receives bundle as argument, could to be used further modify bundle.


For simplest usecase, add this to ```grunt.initConfig()```

```javascript
    browserify: {
	'dist/bundle.js': "src/**/*.js"
    }
```

Example with all settings:

```javascript
    pkg: '<json:package.json>',
    meta: {
      banner: '\n/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n ' + '<%= pkg.homepage ? "* " + pkg.homepage + "\n *\n " : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;\n' +
        ' * Licensed under the <%= _.pluck(pkg.licenses, "type").join(", ") %> license */'
    },
    browserify: {
      'full-example': {
        requires: ['traverse'],
        aliases: ['jquery:jquery-browserify'],
        src: ['src/**/*.js'],
        dest: 'dist/bundle.<%= pkg.version %>.js'
        prepend: ['<banner:meta.banner>'],
        append: [],
        beforeHook: function(bundle) {
          // Do something with bundle before anything else
        },
        hook: function (bundle) {
          // Do something with bundle
        }
      }
    }
```

## Using Browserify Plugins

You can use Browserify plugins by using the `beforeHook` option. This hook is called before anything else and is passed the newly created
bundle. You can use this hook at enable plugins:

```javascript
     browserify: {
      "dist/bundle.js": {
        entries: ['src/**/*.js'],
        beforeHook: function(bundle) {
          var stringify = require('stringify');
          bundle.use(stringify(['.hjs', '.html', '.whatever']));
        }
      }
    }
```

## Using Browserify Plugins

You can use Browserify plugins by using the `beforeHook` option. This hook is called before anything else and is passed the newly created
bundle. You can use this hook at enable plugins:

```javascript
browserify: {
  "dist/bundle.js": {
    entries: ['src/**/*.js'],
    beforeHook: function(bundle) {
      var stringify = require('stringify');
      bundle.use(stringify(['.hjs', '.html', '.whatever']));
    }
  }
}
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History

### v0.1.0
  - Initial release

### v0.1.1
  - Properly support compact and full grunt task syntax

## License
Copyright (c) 2012 Camille Moncelier
Licensed under the MIT license.
