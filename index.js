'use strict';

var _   = require('lodash');
var fs  = require('fs');
var p   = require('path');
var pad = require('pad');

var fields = {
    "name"        : "Theme Name",
    "homepage"    : "Theme URI",
    "description" : "Description",
    "version"     : "Version",
    "author"      : "Author",
    "keywords"    : "Tags"
};

module.exports = function(path) {
    return new WPFileHeader(path);
};

/**
 * WPFileHeader constructor.
 * @param {string} path package.json filepath.
 * @constructor
 */
var WPFileHeader = function(path) {
    if (typeof path === "undefined") {
        path = './package.json';
    }
    this.manifest_path = p.normalize(path);
};

/**
 * Modifes style.css.
 * This will also create one if not exists, but will not create directories.
 *
 * @param {string=} style style.css filepath. Default './style.css'.
 * @param {Function=} cb Callback function to be called.
 * @return {void}
 */
WPFileHeader.prototype.patch = function(style, cb) {
    if (typeof style === "undefined" || typeof style === 'function') {
        cb = style;
        style = './style.css';
    }

    style = p.normalize(style);

    fs.readFile(this.manifest_path, 'utf8', function (err, manifest) {
        if (err) {
            if (cb) cb(err);
            else throw err;
        } else {
            manifest = JSON.parse(manifest);
            fs.readFile(style, 'utf8', function (err, data) {
                if (err && err.code !== 'ENOENT') {
                    if (cb) cb(err);
                    else throw err;
                } else {
                    if (typeof data === "undefined") data = "";
                    var commentsPattern = /(?:\/\*(?:[\s\S]*?)\*\/\s?)|(?:([\s;])+\/\/(?:.*)$)/;
                    if (commentsPattern.test(data)) {
                        data = data.replace(commentsPattern, '');
                    }
                    data = createContent(manifest) + data;
                    fs.writeFile(style, data, function(err) {
                        if (err) {
                            if (cb) cb(err);
                            else throw err;
                        } else {
                            if (cb) cb(null);
                        }
                    });
                }
            });
        }
    });
};

/**
 * Creates style.css header content.
 *
 * @param {Object} manifest
 * @return {string}
 *
 * TODO: add Author URI
 * TODO: add license info
 */
 var createContent = function(manifest) {
    var out = "/*\n";
    _.forEach(fields, function(n, key) {
        if (typeof manifest[key] != "undefined") {
            out += pad(n+":", 20) + manifest[key] + "\n";
        }
    });
    out += "*/\n";

    return out;
};