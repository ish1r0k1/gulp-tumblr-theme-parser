'use strict';

var deap = require('deap');
var fs = require('fs');
var gutil = require('gulp-util');
var isObject = require('isobject');
var path = require('path');
var parser = require('tumblr-theme-parser');
var through = require('through2');

var PLUGIN_NAME = 'gulp-tumblr-theme-parser';

module.exports = function (opts) {
  return through.obj(function (file, enc, cb) {
    opts = opts ? opts : {};
    opts = deap({}, opts);

    if (file.isNull() || !file.contents.toString()) {
      return cb(null, file);
    }

    var compile = function compile() {
      var originalContents = String(file.contents);
      var data = opts.data || {};

      try {
        var compiled = parser.compile(originalContents, data);
        file.contents = new Buffer(compiled);
        file.path = path.join(file.base, file.relative);
      } catch (err) {
        error(err);
      }

      cb(null, file);
    };

    var error = function error(err) {
      return cb(new gutil.PluginError(PLUGIN_NAME, err));
    };

    if (opts.data && !isObject(opts.data)) {
      fs.readFile(opts.data, function (err, file) {
        if (err) return error(err);

        try {
          opts.data = JSON.parse(String(file));
        } catch (err) {
          error(err);
        }

        compile();
      });
    } else {
      compile();
    }
  });
};
