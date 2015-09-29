'use strict';

var expect = require("chai").expect;
var wpfh   = require('..')('./package.json');
var path   = require('path');
var fs     = require('fs');
var tmp    = path.join(__dirname, './fixtures/.working.css');

require('mocha');

describe('gulp-wp-file-header:', function() {

    it('should add \'File Header\' to existing not empty file with some comments', function(done) {
        var wf = use('not-empty-with-some-comments.css');
        var fakeFileOldContents = fs.readFileSync(wf, 'utf8');
        var patch = wpfh.patch(wf, function(err) {
            expect(err).to.be.null;
            var fakeFileNewContents = fs.readFileSync(wf, 'utf8');
            valid(fakeFileNewContents);
            expect(fakeFileNewContents).to.not.equal(fakeFileOldContents);
            fs.unlinkSync(wf);
            done();
        });
    });

    it('should add \'File Header\' to existing not empty file without comments', function(done) {
        var wf = use('not-empty-without-comments.css');
        var fakeFileOldContents = fs.readFileSync(wf, 'utf8');
        var patch = wpfh.patch(wf, function(err) {
            expect(err).to.be.null;
            var fakeFileNewContents = fs.readFileSync(wf, 'utf8');
            valid(fakeFileNewContents);
            expect(fakeFileNewContents).to.not.equal(fakeFileOldContents);
            fs.unlinkSync(wf);
            done();
        });
    });

    it('should add \'File Header\' to existing empty file', function(done) {
        var wf = use('empty-without-comments.css');
        var fakeFileOldContents = fs.readFileSync(wf, 'utf8');
        var patch = wpfh.patch(wf, function(err) {
            expect(err).to.be.null;
            var fakeFileNewContents = fs.readFileSync(wf, 'utf8');
            valid(fakeFileNewContents);
            expect(fakeFileNewContents).to.not.equal(fakeFileOldContents);
            fs.unlinkSync(wf);
            done();
        });
    });

    it('should create new file and add \'File Header\' to it', function(done) {
        var wf = tmp;
        var patch = wpfh.patch(wf, function(err) {
            expect(err).to.be.null;
            var fakeFileNewContents = fs.readFileSync(wf, 'utf8');
            valid(fakeFileNewContents);
            fs.unlinkSync(wf);
            done();
        });
    });

    it('should return error if style.css could not be created', function(done) {
        var wf = 'some/other/folders/style.css';
        var patch = wpfh.patch(wf, function(err) {
            expect(err).to.not.be.null;
            done();
        });
    });

});

var use = function(template) {
    template = path.join(__dirname, './fixtures/' + template);
    fs.createReadStream(template).pipe(fs.createWriteStream(tmp));
    return tmp;
}

var valid = function(c) {
    expect(c).to.not.be.undefined;
    expect(c).to.not.be.null;
    expect(c).to.not.be.empty;
    expect(c).to.contain('Theme Name');
    expect(c).to.contain('Version');
    expect(c).to.contain('Description');
    expect(c).to.contain('Author');
    expect(c).to.contain('Tags');
}