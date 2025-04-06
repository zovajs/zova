export function extendSSRWebserverConf(_context) {
    return function extendSSRWebserverConf(conf, _api) {
        conf.minify = process.env.BUILD_MINIFY === 'true';
        conf.keepNames = true;
        conf.bundle = true;
        conf.external = [];
        conf.banner = { js: 'import { createRequire } from \'module\';const require = createRequire(import.meta.url);' };
    };
}
//# sourceMappingURL=extendSSRWebserverConf.js.map