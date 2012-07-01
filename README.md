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
Add this to ```grunt.initConfig()```
```javascript
    pkg: '<json:package.json>',
    meta: {
      banner: '\n/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n ' + '<%= pkg.homepage ? "* " + pkg.homepage + "\n *\n " : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;\n' +
        ' * Licensed under the <%= _.pluck(pkg.licenses, "type").join(", ") %> license */'
    },
    browserify: {
      "dist/bundle.js": {
        requires: ['traverse'],
        entries: ['src/**/*.js'],
        prepend: ['<banner:meta.banner>'],
        append: [],
        hook: function (bundle) {
          // Do something with bundle
        }
      }
    }
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
v0.1.0
	- Initial release

## License
Copyright (c) 2012 Camille Moncelier
Licensed under the MIT license.
