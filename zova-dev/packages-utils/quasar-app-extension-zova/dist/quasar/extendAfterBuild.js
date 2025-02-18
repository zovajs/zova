import path from 'node:path';
import { loadJSONFile, saveJSONFile } from '../utils.js';
export function extendAfterBuild(context, _flavor) {
    return async function extendAfterBuild(conf, api) {
        const appMode = api.ctx.modeName;
        if (appMode === 'ssr') {
            // env
            await generateEnvJson(conf);
            // package.json
            await patchPackage(conf);
        }
    };
    async function generateEnvJson(conf) {
        const env = Object.assign({}, context.zovaViteMeta?.env, {
            SERVER: true,
            CLIENT: false,
        });
        const envFile = path.join(conf.build.distDir, '.env.json');
        await saveJSONFile(envFile, env);
    }
    async function patchPackage(conf) {
        const pkgFile = path.join(conf.build.distDir, 'package.json');
        const pkg = await loadJSONFile(pkgFile);
        const deps = pkg.dependencies;
        for (const key in deps) {
            if (key.startsWith('zova-module-')) {
                delete deps[key];
            }
        }
        await saveJSONFile(pkgFile, pkg);
    }
}
