# MariaJS Generator [![Build Status](https://secure.travis-ci.org/revathskumar/generator-maria.png?branch=master)](https://travis-ci.org/revathskumar/generator-maria)

A Maria generator for Yeoman that provides a functional boilerplate MariaJS app out of the box. You also get access to a number of sub-generators which can be used to easily create individual models, views and controllers.

## Usage

First make a new directory, and `cd` into it:
```
mkdir my-new-project && cd $_
```

Then install `generator-maria`:
```
npm install generator-maria
```

Run `yo maria`, optionally passing an app name:
```
yo maria
```

Finally, install npm and bower dependencies:
```
(npm install) & (bower install --dev ) &
```

## Generators

Available generators:

- maria:model
- maria:view
- maria:controller

## Options

* `--appPath`

  Generate scaffold into a custom directory.

* `--coffee`

  Generate scaffolds in CoffeeScript. By default check if project uses CoffeeScript.

* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after
  scaffolding has finished.

* `--test-framework=[framework]`

  Defaults to `mocha`. Can be switched for
  another supported testing framework like `jasmine`.


## Contribute

See the [contributing docs](https://github.com/yeoman/yeoman/blob/master/contributing.md)

When submitting an issue, please follow the [guidelines](https://github.com/yeoman/yeoman/blob/master/contributing.md#issue-submission). Especially important is to make sure Yeoman is up-to-date, and providing the command or commands that cause the issue.

When submitting a bugfix, write a test that exposes the bug and fails before applying your fix. Submit the test alongside the fix.

When submitting a new feature, add tests that cover the feature.

## License
[MIT License](http://revathskumar.mit-license.org/)
