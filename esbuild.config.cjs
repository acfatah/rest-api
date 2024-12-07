const esbuild = require('esbuild');

const stripCodePlugin = {
  name: 'strip-code',
  setup(build) {
    build.onLoad({ filter: /\.js$/ }, async (args) => {
      const fs = require('fs');
      let contents = await fs.promises.readFile(args.path, 'utf8');

      const startMarker = '// @esbuild-begin-strip';
      const endMarker = '// @esbuild-end-strip';

      const regex = new RegExp(
        `${startMarker}[\\s\\S]*?${endMarker}`,
        'g'
      );

      contents = contents.replace(regex, '');

      return { contents, loader: 'js' };
    });
  },
};

esbuild.build({
    entryPoints: ['src/server.js'],
    bundle: true,
    platform: 'node',
    outfile: 'dist/server.cjs',
    plugins: [stripCodePlugin],
    external: ['dependencies']
}).catch(() => process.exit(1));
