'use strict';

var deap = require('deap');
var fs = require('fs');
var gutil = require('gulp-util');
var isObject = require('isobject');
var path = require('path');
var parser = require('tumblr-theme-parser');
var through = require('through2');

var PLUGIN_NAME = 'gulp-tumblr-theme-parser';

module.exports = function(opts, cb) {
  opts = opts ? opts : {};

  function setup(opts, cb) {
    var options = deap({}, opts);

    if (options.data && !isObject(options.data)) {
      fs.readFile(options.data, function (err, file) {
        if (err) return error(err);

        options.data = JSON.parse(String(file));

        cb(options);
      });
    } else {
      cb(options);
    }

    function error(err) {
      cb(new gutil.PluginError(PLUGIN_NAME, err, {fileName: err.path}));
      this.emit('error', new gutil.PluginError(PLUGIN_NAME, err));
    }
  }

  function compileHtml(file, enc, cb) {
    setup(opts || {}, compile);

    function compile(opts) {
      var originalContents = String(file.contents);
      var data = opts.data || {};

      if (file.isNull() || !file.contents.toString()) {
        cb(null, file);
        return;
      }

      try {
        var compiled = parser.compile(originalContents, data);
        file.contents = new Buffer(compiled);
        file.path = path.join(file.base, file.relative)
      } catch (err) {
        error(err);
      }

      function error(err) {
        cb(new gutil.PluginError(PLUGIN_NAME, err, {fileName: file.path}));
        this.emit('error', new gutil.PluginError(PLUGIN_NAME, err));
      }

      cb(null, file);
    }
  }

  return through.obj(compileHtml);
};
