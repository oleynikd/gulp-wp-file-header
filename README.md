# gulp-wp-file-header

[Node.js](https://nodejs.org) plugin that adds ['File Header'](https://codex.wordpress.org/File_Header) to [Wordpress Theme's style.css file](https://codex.wordpress.org/Theme_Development#Theme_Stylesheet) based on [package.json](https://docs.npmjs.com/files/package.json) data

For now works only with style.css file (supports only WP Themes, not plugins)

## Installation

```bash
$ npm i gulp-wp-file-header --save-dev
```

## Description
Creates this:
**style.css**
```css
/*
Theme Name:         MySuper Theme
Theme URI:          http://example.com/
Description:        MySuper is a modern responsive WordPress theme
Version:            0.0.1
Author:             Denis Oleynik <oleynik.denis@gmail.com>
Tags:               flat,modern,responsive,mobile-first,portfolio,corporate,multi-purpose
*/

```

From this:
**package.json**
```json
{
    "name": "MySuper Theme",
    "version": "0.0.1",
    "author": "Denis Oleynik <oleynik.denis@gmail.com>",
    "homepage": "http://example.com/",
    "description": "MySuper is a modern responsive WordPress theme",
    "keywords": [
        "flat",
        "modern",
        "responsive",
        "mobile-first",
        "portfolio",
        "corporate",
        "multi-purpose"
    ],
    "private": true,
    "engines": {
        "node": ">= 0.12.0",
        "npm": ">=2.1.5"
    }
}

```
## Usage
#### Plain
```js
var wp = require('gulp-wp-file-header')('./package.json');
wp.patch('./style.css', function(err){
    // done
});
```
or just
```js
var wp = require('gulp-wp-file-header')();
wp.patch();
```

#### With Gulp:
```js
var gulp = require('gulp');
var wp   = require('gulp-wp-file-header')('./package.json');

gulp.task('wp', function () {
    wp.patch('./style.css', function(err){
        // done
    });
});
```

#### With Grunt:
```js
module.exports = function(grunt) {
    var wp = require('gulp-wp-file-header')('./package.json');
    grunt.registerTask('wp', function() {
        var done = this.async();
        wp.patch('./style.css', function(err){
            done();
        });
    });
};
```