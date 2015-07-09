# gulp-wp-file-header

> [Gulp](https://github.com/gulpjs/gulp) plugin that adds ['File Header'](https://codex.wordpress.org/File_Header) to [Wordpress Theme's style.css file](https://codex.wordpress.org/Theme_Development#Theme_Stylesheet) based on [package.json](https://docs.npmjs.com/files/package.json) data

For now works only with style.css file (supports only WP Themes, not plugins)

## Information

<table>
<tr>
<td>Package</td><td>gulp-wp-file-header</td>
</tr>
<tr>
<td>Description</td>
<td>Adds 'File Header' to Wordpress Theme's style.css file based on package.json data</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.9</td>
</tr>
<tr>
<td>Gulp Version</td>
<td>3.x</td>
</tr>
</table>

## Installation

```bash
$ npm install gulp-wp-file-header --save
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
## Basic Usage

```js
var gulp    = require('gulp');
var wp      = require('gulp-wp-file-header')('./package.json');

gulp.task('wp', function () {
	return gulp.src('./style.css')
		.pipe(wp.patch())
		.pipe(gulp.dest('./'));
});
```

## LICENSE

(MIT License)

Copyright (c) 2015 Denis Oleynik <oleynik.denis@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.