import esbuild from 'esbuild';

esbuild
    .build({
        entryPoints: ['./src/public/index.js'],
        bundle: true,
	minify: true,
        outfile: './src/public/main.js',
        plugins: []
    })
    .catch(() => process.exit(1));