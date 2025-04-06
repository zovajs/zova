import { getOutDir } from 'zova-vite';
export function extendSSRWebserverConf(_context) {
    return function extendSSRWebserverConf(conf, api) {
        conf.minify = process.env.BUILD_MINIFY === 'true';
        conf.keepNames = true;
        conf.bundle = true;
        conf.external = [];
        conf.banner = { js: 'import { createRequire } from \'module\';const require = createRequire(import.meta.url);' };
        conf.entryPoints = [
            { in: api.resolve.entry('ssr-prod-webserver.js'), out: 'index.js' },
            { in: api.resolve.entry('ssr-prod-handler.js'), out: 'entry.js' },
        ];
        conf.outdir = getOutDir();
        delete conf.outfile;
    };
}
//# sourceMappingURL=extendSSRWebserverConf.js.map