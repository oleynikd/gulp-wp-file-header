'use strict';

var gutil 		= require('gulp-util');
var should		= require('should');
var wpfh 		= require('..');
var path 		= require('path');
var fs 			= require('fs');

require('mocha');

describe('gulp-wp-file-header:', function() {

	it('should add \'File Header\'', function(done) {

		var filePath = './fixtures/test.css';
		var fakeFile = new gutil.File({
			contents: new Buffer(fs.readFileSync(path.join(__dirname, filePath))),
			path: path.join(__dirname, filePath)
		});

		var fakeFileOldontents = fakeFile.contents.toString();

		var wpfhS = wpfh(path.join(__dirname, '../package.json'));

		var patch = wpfhS.patch();
		patch.write(fakeFile);
		patch.end();

		patch.once('data', function(newFile) {
			should.exist(newFile);
			should.exist(newFile.contents);

			var text = newFile.contents.toString();
			text.should.not.equal(fakeFileOldontents);
			text.should.match(/^[\n\r]*\/\*[\n\r]*(.*[\n\r]*)+\*\/[\n\r]?/);

			return done();
		});

	});

});