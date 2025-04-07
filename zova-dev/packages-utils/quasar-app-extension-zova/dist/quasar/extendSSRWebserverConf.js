import { getOutDir } from 'zova-vite';
export function extendSSRWebserverConf(context) {
    return function extendSSRWebserverConf(conf, api) {
        if (context.configMeta?.mode !== 'production')
            return;
        conf.minify = process.env.BUILD_MINIFY === 'true';
        conf.keepNames = true;
        conf.bundle = true;
        conf.external = [];
        conf.banner = { js: 'import { createRequire } from \'module\';const require = createRequire(import.meta.url);' };
        conf.entryPoints = [
            { in: api.resolve.entry('ssr-prod-webserver.js'), out: 'index' },
            { in: api.resolve.entry('ssr-prod-handler.js'), out: 'handler' },
        ];
        conf.outdir = getOutDir();
        delete conf.outfile;
    };
}
//# sourceMappingURL=extendSSRWebserverConf.js.map