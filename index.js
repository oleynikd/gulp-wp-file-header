'use strict';

var _        		= require('lodash');
var gutil 			= require('gulp-util');
var through 		= require('through2');
var fs				= require('fs');
var p					= require('path');
var pad 				= require('pad');

var fields			= {
	"name" 					: "Theme Name",
	"homepage"				: "Theme URI",
	"description"			: "Description",
	"version"				: "Version",
	"author"					: "Author",
	"keywords"				: "Tags"
};

module.exports = function(path, options) {

	return new WPFileHeader(path, options);

};

var WPFileHeader = function(path, options) {

	if (typeof path === "undefined") {
		path = './package.json';
	}
	this.manifest_path = path;

};

WPFileHeader.prototype.patch = function() {

	var content;
	var commentsPattern = /^[\n\r]*\/\*[\n\r]*(.*[\n\r]*)+\*\/[\n\r]?/;

	var manifest = JSON.parse(fs.readFileSync(p.normalize(this.manifest_path), 'utf8'));

	return through.obj(function(file, enc, cb) {
		if (file.isNull()) {
			return cb(null, file);
		}
		if (file.isStream()) {
			return cb(new gutil.PluginError('gulp-wp-file-header', 'Streaming not supported'));
		}

		content = file.contents.toString();

		if (commentsPattern.test(content)) {
			content = content.replace(commentsPattern, '');
		}

		content = WPFileHeader.createContent(manifest) + content;

		file.contents = new Buffer(content);

		cb(null, file);
	});

};
/**
 * Creates style.css header content
 * @param  JS Object manifest
 * @return String
 *
 * TODO: add Author URI
 * TODO: add license info
 */
WPFileHeader.createContent = function(manifest) {

	var out 	= "/*\n";
	_.forEach(fields, function(n, key) {
		if (typeof manifest[key] != "undefined") {
			out += pad(n+":", 20) + manifest[key] + "\n";
		}
	});
	out += "*/\n";

	return out;

};