const esbuild = require('esbuild');

esbuild
    .build({
        entryPoints: ['./src/public/js/index.mjs'],
        bundle: true,
	minify: true,
        outfile: './src/public/js/main.mjs',
        plugins: []
    })
    .catch(() => process.exit(1));