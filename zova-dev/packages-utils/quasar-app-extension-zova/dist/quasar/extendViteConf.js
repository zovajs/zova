import { createLogger, mergeConfig } from 'vite';
import { generateConfigDefine } from 'zova-vite';
const __SvgIconPattern = /\.metadata\/icons\/groups\/.*?\.svg/;
export function extendViteConf(context) {
    return function extendViteConf(conf, opts, _api) {
        const zovaViteMeta = context.zovaViteMeta;
        // conf.build override zovaViteMeta.viteConfig.build
        const minify = conf.build?.minify;
        // have two outDir for ssr
        const outDir = conf.build?.outDir;
        conf.build = mergeConfig(conf.build || {}, zovaViteMeta.viteConfig.build);
        if (minify === false) {
            conf.build.minify = minify;
        }
        if (outDir) {
            conf.build.outDir = outDir;
        }
        // css
        conf.css = mergeConfig(conf.css || {}, {
            preprocessorOptions: {
                scss: {
                    api: 'modern',
                },
            },
        });
        // hmr
        if (opts.isClient) {
            conf.server = mergeConfig(conf.server || {}, {
                hmr: {
                    port: 24679,
                },
            });
        }
        // assetsInlineLimit
        if (opts.isServer) {
            conf.build.assetsInlineLimit = (filePath) => {
                if (__SvgIconPattern.test(filePath)) {
                    return Infinity;
                }
            };
        }
        // env
        let env;
        if (opts.isClient) {
            env = zovaViteMeta.env;
        }
        else {
            env = Object.assign({}, zovaViteMeta.env, {
                SERVER: true,
                CLIENT: false,
            });
            // special for dist files
            process.env.SERVER = env.SERVER;
            // process.env.CLIENT = env.CLIENT; // should not set if false
        }
        // define
        if (opts.isClient) {
            const define = generateConfigDefine(env);
            conf.define = mergeConfig(conf.define || {}, define);
        }
        else {
            // env: special for dist files
            const define = generateConfigDefine({
                NODE_ENV: env.NODE_ENV,
                META_FLAVOR: env.META_FLAVOR,
                META_MODE: env.META_MODE,
                META_APP_MODE: env.META_APP_MODE,
                SERVER: env.SERVER,
                CLIENT: env.CLIENT,
                DEV: env.DEV,
                PROD: env.PROD,
                SSR: env.SSR,
            });
            conf.define = mergeConfig(conf.define || {}, define);
        }
        // ssr
        if (opts.isServer && (context.configMeta?.mode === 'development')) {
            conf.ssr = mergeConfig(conf.ssr || {}, {
                external: [
                    'vue',
                    'pinia',
                    '@vue/runtime-core',
                    '@vue/reactivity',
                    '@vue/runtime-dom',
                    '@cabloy/vue-reactivity',
                    '@cabloy/vue-runtime-core',
                    '@cabloy/vue-runtime-dom',
                ],
                optimizeDeps: {
                    noDiscovery: false,
                },
            });
        }
        // ssr: logger
        if (opts.isServer && context.configMeta?.mode === 'development') {
            const logger = createLogger();
            const loggerWarn = logger.warn;
            logger.warn = (msg, options) => {
                if (msg.includes('Failed to load source map'))
                    return;
                loggerWarn(msg, options);
            };
            conf.customLogger = logger;
        }
    };
}
//# sourceMappingURL=extendViteConf.js.map