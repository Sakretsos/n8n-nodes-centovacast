const fs = require('fs');
const path = require('path');

function copyFiles(srcDir, destDir, extensions) {
	if (!fs.existsSync(srcDir)) return;
	const entries = fs.readdirSync(srcDir, { withFileTypes: true });
	for (const entry of entries) {
		const srcPath = path.join(srcDir, entry.name);
		const destPath = path.join(destDir, entry.name);
		if (entry.isDirectory()) {
			copyFiles(srcPath, destPath, extensions);
		} else if (extensions.some(ext => entry.name.endsWith(ext))) {
			fs.mkdirSync(destDir, { recursive: true });
			fs.copyFileSync(srcPath, destPath);
		}
	}
}

copyFiles('credentials', 'dist/credentials', ['.png', '.svg']);
copyFiles('nodes', 'dist/nodes', ['.png', '.svg']);
