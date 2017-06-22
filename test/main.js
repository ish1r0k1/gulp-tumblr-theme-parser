'use strict'

var fs = require('fs')
var should = require('should')
var path = require('path')

var gutil = require('gulp-util')
var parser = require('../index')

describe('gulp-tumblr-theme-parser', function() {
  var expectedFile = new gutil.File({
    path: 'test/expected/output.html',
    cwd: 'test/',
    base: 'test/expected',
    contents: fs.readFileSync('test/expected/output.html')
  })

  it('should produce correct html output when rendering a file', function (done) {
    var srcFile = new gutil.File({
      path: 'test/fixtures/ok.html',
      cwd: 'test/',
      base: 'test/fixtures',
      contents: fs.readFileSync('test/fixtures/ok.html')
    })

    var stream = parser({ data: { "block:Title": true, title: 'gulp-tumblr-theme-parser' } })

    stream.on('error', function (err) {
      should.exist(err)
      done(err)
    })

    stream.on('data', function (newFile) {
      should.exist(newFile)
      should.exist(newFile.contents)

      String(newFile.contents).should.equal(String(expectedFile.contents))
      done()
    })

    stream.write(srcFile)
    String(path.extname(srcFile.path).should.equal('.html'))

    stream.end()
  })

  it('should produce correct html output when rendering a file used the setting by json', function (done) {
    var srcFile = new gutil.File({
      path: 'test/fixtures/ok.html',
      cwd: 'test/',
      base: 'test/fixtures',
      contents: fs.readFileSync('test/fixtures/ok.html')
    })

    var stream = parser({ data: 'test/fixtures/data.json' })

    stream.on('error', function (err) {
      should.exist(err)
      done(err)
    })

    stream.on('data', function (newFile) {
      should.exist(newFile)
      should.exist(newFile.contents)

      String(newFile.contents).should.equal(String(expectedFile.contents))
      done()
    })

    stream.write(srcFile)
    String(path.extname(srcFile.path).should.equal('.html'))

    stream.end()
  })

  it('should throw error when syntax is incorrect', function (done) {
    var srcFile = new gutil.File({
      path: 'test/fixtures/nok.html',
      cwd: 'test/',
      base: 'test/fixtures',
      contents: fs.readFileSync('test/fixtures/nok.html')
    })

    var stream = parser({ data: { "block:Title": true, title: 'gulp-tumblr-theme-parser' } })

    stream.on('error', function (err) {
      should.exist(err)
      done()
    })

    stream.write(srcFile)
    stream.end()
  })

  it('should throw error when notfound data file', function (done) {
    var srcFile = new gutil.File({
      path: 'test/fixtures/ok.html',
      cwd: 'test/',
      base: 'test/fixtures',
      contents: fs.readFileSync('test/fixtures/nok.html')
    })

    var stream = parser({ data: './notfound.json' })

    stream.on('error', function (err) {
      should.exist(err)
      done()
    })

    stream.write(srcFile)
    stream.end()
  })

  it('should throw error when the data file parsing error', function (done) {
    var srcFile = new gutil.File({
      path: 'test/fixtures/ok.html',
      cwd: 'test/',
      base: 'test/fixtures',
      contents: fs.readFileSync('test/fixtures/nok.html')
    })

    var stream = parser({ data: './error.json' })

    stream.on('error', function (err) {
      should.exist(err)
      done()
    })

    stream.write(srcFile)
    stream.end()
  })

  it('should throw error when the no corresponding parameters', function (done) {
    var srcFile = new gutil.File({
      path: 'test/fixtures/ok.html',
      cwd: 'test/',
      base: 'test/fixtures',
      contents: fs.readFileSync('test/fixtures/nok.html')
    })

    var stream = parser({ data: { description: 'Node tumblr theme parser for gulp' } })

    stream.on('error', function (err) {
      should.exist(err)
      done()
    })

    stream.write(srcFile)
    stream.end()
  })

  it('should throw error when the no data parameter', function (done) {
    var srcFile = new gutil.File({
      path: 'test/fixtures/ok.html',
      cwd: 'test/',
      base: 'test/fixtures',
      contents: fs.readFileSync('test/fixtures/nok.html')
    })

    var stream = parser()

    stream.on('error', function (err) {
      should.exist(err)
      done()
    })

    stream.write(srcFile)
    stream.end()
  })
})
