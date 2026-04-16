const { src, dest } = require('gulp');

function buildIcons() {
	src('credentials/**/*.{png,svg}').pipe(dest('dist/credentials'));
	return src('nodes/**/*.{png,svg}').pipe(dest('dist/nodes'));
}

exports['build:icons'] = buildIcons;
