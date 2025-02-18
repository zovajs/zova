export function extendSSRWebserverConf(_context) {
    return function extendSSRWebserverConf(conf, _api) {
        conf.minify = process.env.BUILD_MINIFY === 'true';
    };
}
